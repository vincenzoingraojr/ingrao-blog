import { User, ViewLog } from "../entities/User";
import {
    Arg,
    Ctx,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { And, LessThan, MoreThan, Not, Repository } from "typeorm";
import argon2 from "argon2";
import { AuthContext } from "../types";
import { sendRefreshToken } from "../auth/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth/auth";
import { verify } from "jsonwebtoken";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { FieldError } from "./common";
import { isAuth } from "../middleware/isAuth";
import aws from "aws-sdk";
import axios from "axios";
import appDataSource from "../dataSource";
import { createDateArray } from "../helpers/createDateArray";

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true, defaultValue: [] })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User | null;

    @Field(() => String, { nullable: true, defaultValue: "" })
    accessToken?: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    status?: string;
}

@ObjectType()
class ExtendedUserResponse extends UserResponse {
    @Field(() => Boolean, { nullable: true, defaultValue: false })
    ok: boolean;
}

@ObjectType()
class ViewByDay {
    @Field(() => Int, { nullable: false })
    views: number;

    @Field(() => String, { nullable: false })
    date: string;
}

@ObjectType()
export class AnalyticsResponse {
    @Field(() => Int, { nullable: false })
    views: number;

    @Field(() => [ViewByDay], { nullable: false })
    viewsByDay: ViewByDay[];

    @Field(() => Number, { nullable: false })
    viewsVariation: number;

    @Field(() => Int, { nullable: false })
    uniqueVisitors: number;

    @Field(() => Number, { nullable: false })
    uniqueVisitorsVariation: number;
}

@ObjectType()
export class UserFrequenciesResponse {
    @Field(() => Int, { nullable: false })
    authenticatedUsers: number;

    @Field(() => Int, { nullable: false })
    unAuthenticatedUsers: number;
}

@Resolver(User)
export class UserResolver {
    private readonly userRepository: Repository<User>;
    private readonly viewLogRepository: Repository<ViewLog>;

    constructor() {
        this.userRepository = appDataSource.getRepository(User);
        this.viewLogRepository = appDataSource.getRepository(ViewLog);
    }

    @Query(() => User, { nullable: true })
    me(@Arg("origin") origin: string, @Ctx() context: AuthContext) {
        const authorization = context.req.headers["authorization"];

        let user;

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            );

            if (origin === "dash" && payload.role !== "user") {
                user = this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["posts", "issues", "comments"],
                });
            } else {
                user = this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["comments"],
                });
            }

            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    @Query(() => User, { nullable: true })
    findUser(@Arg("id", () => Int, { nullable: true }) id: number) {
        return appDataSource.manager.findOne(User, { where: { id }, relations: ["posts", "issues", "comments"] });
    }

    @Query(() => [User])
    dashUsers() {
        return this.userRepository.find({
            where: {
                role: Not("user"),
            },
        });
    }

    @Mutation(() => UserResponse, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Arg("origin") origin: string,
        @Ctx() { res }: AuthContext
    ): Promise<UserResponse> {
        const ses = new aws.SES({
            credentials: {
                accessKeyId: process.env.SES_KEY_ID as string,
                secretAccessKey: process.env.SES_SECRET_KEY as string,
            },
            region: "eu-south-1",
        });

        let errors = [];
        let user = null;
        let accessToken = "";
        let status = "";

        if (origin === "dash") {
            user = await this.userRepository.findOne({
                where: { email },
                relations: ["posts", "issues", "comments"],
            });
        } else {
            user = await this.userRepository.findOne({
                where: { email },
                relations: ["comments"],
            });
        }

        if (!user) {
            errors.push({
                field: "email",
                message: "Sorry, but we can't find your account",
            });
        } else {
            if (
                (user.password === "" || user.password === null) &&
                origin === "dash" && user.role !== "user"
            ) {
                const token = createAccessToken(user);
                const link = `${process.env.DASHBOARD_ORIGIN}/complete-account/${token}`;

                ejs.renderFile(
                    path.join(
                        __dirname,
                        "../helpers/templates/CompleteAccount.ejs"
                    ),
                    { link: link },
                    function (error, data) {
                        if (error) {
                            console.log(error);
                        } else {
                            const params: aws.SES.SendEmailRequest = {
                                Destination: {
                                    ToAddresses: [email],
                                },
                                Message: {
                                    Body: {
                                        Html: {
                                            Data: data,
                                        },
                                    },
                                    Subject: {
                                        Data: "Complete your account",
                                    },
                                },
                                Source: "noreply@ingrao.blog",
                            };

                            status = "You should now receive an email containing the instructions to set up a password.";

                            ses.sendEmail(params)
                                .promise()
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                    }
                );
            } else {
                if ((user.password === "" || user.password === null) && user.role !== "user" && origin === "blog") {
                    status = "You seem to be part of the staff. Go to the dashboard to set up your password.";
                }  
                if (user.password.length > 0 && ((user.role !== "user" && origin === "dash") || (origin === "blog"))) {
                    const valid = await argon2.verify(user.password, password);

                    if (!valid) {
                        errors.push({
                            field: "password",
                            message: "Incorrect password",
                        });
                    } else {
                        if (user.verified) {
                            sendRefreshToken(res, createRefreshToken(user));
                            accessToken = createAccessToken(user);
                            status = "You are now logged in.";
                        } else {
                            status =
                                "Your email address is not verified. We just sent you an email containing the instructions for verification.";
                            const verifyToken = createAccessToken(user);
                            sendVerificationEmail(email, origin, verifyToken);
                        }
                    }
                } else if (user.role === "user" && origin === "dash") {
                    status = "Regular users can't log in to the dashboard.";
                }
            }
        }

        return {
            user,
            errors,
            accessToken,
            status,
        };
    }

    @Mutation(() => UserResponse, { nullable: true })
    async signup(
        @Arg("email") email: string,
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("password") password: string,
        @Arg("title") title: string,
        @Arg("gender") gender: string,
        @Arg("newsletterSubscribed") newsletterSubscribed: boolean,
        @Arg("birthDate") birthDate: Date
    ): Promise<UserResponse> {
        let errors = [];

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }
        if (firstName === "" || firstName === null) {
            errors.push({
                field: "firstName",
                message: "The first name field cannot be empty",
            });
        }
        if (lastName === "" || lastName === null) {
            errors.push({
                field: "lastName",
                message: "The last name field cannot be empty",
            });
        }
        if (title === "Title" || title === "") {
            errors.push({
                field: "title",
                message: "The title field cannot take this value",
            });
        }
        if (gender === "Gender" || gender === "") {
            errors.push({
                field: "gender",
                message: "The title field cannot take this value",
            });
        }
        if (birthDate === null) {
            errors.push({
                field: "birthDate",
                message: "The birthdate field cannot take this value",
            });
        }

        let user = null;
        let status = "";
        const hashedPassword = await argon2.hash(password);

        if (errors.length === 0) {
            try {
                const result = await this.userRepository
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values({
                        email,
                        password: hashedPassword,
                        firstName,
                        lastName,
                        title,
                        gender,
                        birthDate,
                        newsletterSubscribed,
                        role: "user",
                        verified: false,
                    })
                    .returning("*")
                    .execute();
                user = result.raw[0];
                const token = createAccessToken(user);
                sendVerificationEmail(email, "client", token);
                status =
                    "Check your inbox, we just sent you an email with the instructions to verify your account.";
            } catch (error) {
                console.log(error);

                if (error.detail.includes("email")) {
                    errors.push({
                        field: "email",
                        message: "A user using this email already exists",
                    });
                }
            }
        }

        return {
            user,
            errors,
            status,
        };
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: AuthContext) {
        sendRefreshToken(res, "");

        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("id", () => Number) id: number) {
        await this.userRepository
            .increment({ id }, "tokenVersion", 1);

        return true;
    }

    @Mutation(() => UserResponse)
    async verifyEmailAddress(
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let status = "";

        try {
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            );
            await this.userRepository.update(
                {
                    id: payload.id,
                },
                {
                    verified: true,
                }
            );
            status = "Your email address is now verified.";
        } catch (error) {
            console.error(error);
            status =
                "An error has occurred. Please repeat the email address verification.";
        }

        return { status };
    }

    @Mutation(() => UserResponse)
    async sendRecoveryEmail(
        @Arg("email") email: string,
        @Arg("origin") origin: string
    ): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let errors = [];
        let user = null;
        let status = "";

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        } else {
            user = await User.findOne({ where: { email } });

            if (!user) {
                errors.push({
                    field: "email",
                    message:
                        "This email address is not associated with any account",
                });
            } else if (!user.verified) {
                status =
                    "Your email address is not verified. We just sent you an email containing the instructions for verification.";
                const verifyToken = createAccessToken(user);
                sendVerificationEmail(user.email, origin, verifyToken);
            } else {
                const token = createAccessToken(user);
                const link = `${
                    origin === "dash"
                        ? process.env.DASHBOARD_ORIGIN
                        : process.env.CLIENT_ORIGIN
                }/modify-password/${token}`;

                try {
                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/RecoveryEmail.ejs"
                        ),
                        { link: link },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else {
                                transporter.sendMail({
                                    from: "Support Team | ingrao.blog <support@ingrao.blog>",
                                    to: email,
                                    subject: "Recover your password",
                                    html: data,
                                });
                                status =
                                    "Check your inbox, we just sent you an email with the instructions to recover your account password.";
                            }
                        }
                    );
                } catch (error) {
                    console.error(error);
                    errors.push({
                        field: "email",
                        message:
                            "Could not send the email, check your internet connection",
                    });
                }
            }
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => UserResponse)
    async notAuthModifyPassword(
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let errors = [];

        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }

        if (confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "The confirmation password lenght must be greater than 2",
            });
        }

        if (password != confirmPassword) {
            errors.push(
                {
                    field: "password",
                    message: "The two passwords do not match",
                },
                {
                    field: "confirmPassword",
                    message: "The two passwords do not match",
                }
            );
        }

        let status = "";

        if (errors.length === 0) {
            try {
                const payload: any = verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET as string
                );
                await this.userRepository.update(
                    {
                        id: payload.id,
                    },
                    {
                        password: await argon2.hash(password),
                    }
                );

                status = "The password has been changed, now you can log in.";
            } catch (error) {
                status =
                    "An error has occurred. Please repeat the password recovery operation.";
            }
        }

        return {
            status,
            errors,
        };
    }

    @Mutation(() => UserResponse, { nullable: true })
    @UseMiddleware(isAuth)
    async addDashUser(
        @Arg("email") email: string,
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("title") title: string,
        @Arg("gender") gender: string,
        @Arg("role") role: string,
        @Arg("birthDate") birthDate: Date,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        const ses = new aws.SES({
            credentials: {
                accessKeyId: process.env.SES_KEY_ID as string,
                secretAccessKey: process.env.SES_SECRET_KEY as string,
            },
            region: "eu-south-1",
        });

        let errors = [];
        let user = null;
        let status = "";

        if (payload && payload.role === "admin") {
            if (!email.includes("@") || email === "" || email === null) {
                errors.push({
                    field: "email",
                    message: "Invalid email",
                });
            }
            if (firstName === "" || firstName === null) {
                errors.push({
                    field: "firstName",
                    message: "The first name field cannot be empty",
                });
            }
            if (lastName === "" || lastName === null) {
                errors.push({
                    field: "lastName",
                    message: "The last name field cannot be empty",
                });
            }
            if (role === "Role" || role === "") {
                errors.push({
                    field: "role",
                    message: "The role field cannot take this value",
                });
            }
            if (title === "Title" || title === "") {
                errors.push({
                    field: "title",
                    message: "The title field cannot take this value",
                });
            }
            if (gender === "Gender" || gender === "") {
                errors.push({
                    field: "gender",
                    message: "The gender field cannot take this value",
                });
            }
            if (birthDate === null) {
                errors.push({
                    field: "birthDate",
                    message: "The birthdate field cannot take this value",
                });
            }

            if (errors.length === 0) {
                try {
                    const result = await this.userRepository
                        .createQueryBuilder()
                        .insert()
                        .into(User)
                        .values({
                            email,
                            firstName,
                            lastName,
                            title,
                            gender,
                            birthDate,
                            role,
                            newsletterSubscribed: true,
                            verified: true,
                        })
                        .returning("*")
                        .execute();
                    user = result.raw[0];
                    const token = createAccessToken(user);
                    const link = `${process.env.DASHBOARD_ORIGIN}/complete-account/${token}`;
                    status = "The new user should now receive an email containing the instructions to set up a password.";

                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/CompleteAccount.ejs"
                        ),
                        { link: link },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else {
                                const params: aws.SES.SendEmailRequest = {
                                    Destination: {
                                        ToAddresses: [email],
                                    },
                                    Message: {
                                        Body: {
                                            Html: {
                                                Data: data,
                                            },
                                        },
                                        Subject: {
                                            Data: "Complete your account",
                                        },
                                    },
                                    Source: "noreply@ingrao.blog",
                                };

                                ses.sendEmail(params)
                                    .promise()
                                    .catch((error) => {
                                        console.error(error);
                                        status = "An error has occurred and the email cannot be sent, but the user has been created. The new user can set up the account password during the log in operation."
                                    });
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);

                    if (error.detail.includes("email")) {
                        errors.push({
                            field: "email",
                            message: "A user using this email already exists",
                        });
                    }
                }
            }
        } else {
            status =
                "You are not authorized to add new users to the dashboard.";
        }

        return {
            user,
            errors,
            status,
        };
    }

    @Mutation(() => UserResponse)
    async passwordSetup(
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let errors = [];

        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }

        if (confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "The confirmation password lenght must be greater than 2",
            });
        }

        if (password != confirmPassword) {
            errors.push(
                {
                    field: "password",
                    message: "The two passwords do not match",
                },
                {
                    field: "confirmPassword",
                    message: "The two passwords do not match",
                }
            );
        }

        let status = "";

        if (errors.length === 0) {
            try {
                const payload: any = verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET as string
                );
                await this.userRepository.update(
                    {
                        id: payload.id,
                        role: payload.role,
                    },
                    {
                        password: await argon2.hash(password),
                    }
                );

                status =
                    "You have set up your account password, now you can log in.";
            } catch (error) {
                status =
                    "An error has occurred. Please repeat the password setup operation.";
            }
        }

        return {
            status,
            errors,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editProfile(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("profilePicture") profilePicture: string,
        @Arg("title") title: string,
        @Arg("gender") gender: string,
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let user = null;
        let status = "";

        if (firstName === "" || firstName === null) {
            errors.push({
                field: "firstName",
                message: "The first name field cannot be empty",
            });
        }
        if (title === "Title" || title === "") {
            errors.push({
                field: "title",
                message: "The title field cannot take this value",
            });
        }
        if (gender === "Gender" || gender === "") {
            errors.push({
                field: "gender",
                message: "The gender field cannot take this value",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (errors.length === 0) {
            try {
                await this.userRepository.update(
                    {
                        id: payload.id,
                    },
                    {
                        firstName,
                        lastName,
                        profilePicture,
                        title,
                        gender,
                    },
                );

                if (origin === "dash") {
                    user = await this.userRepository.findOne({
                        where: { id: payload.id },
                        relations: ["posts", "issues", "comments"],
                    });
                } else {
                    user = await this.userRepository.findOne({
                        where: { id: payload.id },
                        relations: ["comments"],
                    });
                }
                status = "Your profile has been updated.";
            } catch (error) {
                console.log(error);
                status =
                    "An error has occurred. Please try again later to edit your profile.";
            }
        }

        return {
            errors,
            user,
            status,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editEmailAddress(
        @Arg("email") email: string,
        @Arg("confirmEmail") confirmEmail: string,
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        let errors = [];

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (!confirmEmail.includes("@") || confirmEmail === "" || confirmEmail === null) {
            errors.push({
                field: "confirmEmail",
                message: "Invalid confirmation email",
            });
        }

        if (email != confirmEmail) {
            errors.push(
                {
                    field: "email",
                    message: "The two email addresses do not match",
                },
                {
                    field: "confirmEmail",
                    message: "The two email addresses do not match",
                }
            );
        }

        let status = "";
        let user = null;

        if (payload) {
            if (origin === "dash") {
                user = await this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["posts", "issues", "comments"],
                });
            } else {
                user = await this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["comments"],
                });
            }

            if (user && user.email === email) {
                errors.push({
                    field: "email",
                    message: "The email address you entered is the one you are already using",
                });
            }

            if (user && errors.length === 0) {
                const token = createAccessToken(user);
                const link = `${
                    origin === "dash"
                        ? process.env.DASHBOARD_ORIGIN
                        : process.env.CLIENT_ORIGIN
                }/settings/account/verify-email/${token}`;

                try {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            email,
                            verified: false,
                        },
                    );

                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/VerifyNewEmail.ejs"
                        ),
                        { link: link },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                                status = "Could not send the email, check your internet connection.";
                            } else {
                                transporter.sendMail({
                                    from: "Support Team | ingrao.blog <support@ingrao.blog>",
                                    to: email,
                                    subject: "Verify your new email address",
                                    html: data,
                                });
                                status =
                                    "Check your inbox, we just sent you an email with the instructions to verify your new email address.";
                            }
                        }
                    );
                } catch (error) {
                    console.error(error);
                    if (error.code === "23505") {
                        status = "A user using this email address already exists.";
                    } else {
                        status = "An error has occurred. Please try again later to edit your email address.";
                    }
                }
            }
        } else {
            status = "You are not authenticated.";
        }

        return {
            status,
            errors,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async authSendVerificationEmail(
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let status = "";
        
        let user: User | null = null;

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (origin === "dash") {
                user = await this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["posts", "issues", "comments"],
                });
            } else {
                user = await this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["comments"],
                });
            }

            if (user) {
                const token = createAccessToken(user);
                const link = `${
                    origin === "dash"
                        ? process.env.DASHBOARD_ORIGIN
                        : process.env.CLIENT_ORIGIN
                }/settings/account/verify-email/${token}`;

                try {
                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/VerifyEmail.ejs"
                        ),
                        { link: link },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else if (user) {
                                transporter.sendMail({
                                    from: "Support Team | ingrao.blog <support@ingrao.blog>",
                                    to: user.email,
                                    subject: "Verify your email address",
                                    html: data,
                                });
                                status =
                                    "Check your inbox, we just sent you an email with the instructions to verify your email address.";
                            } else {
                                console.log("User not found.");
                            }
                        }
                    );
                } catch (error) {
                    console.error(error);
                    status = "Could not send the email, check your internet connection.";
                }
            }
        }

        return {
            status
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changePassword(
        @Arg("currentPassword") currentPassword: string,
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];

        if (currentPassword.length <= 2) {
            errors.push({
                field: "currentPassword",
                message: "The current password lenght must be greater than 2",
            });
        }

        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }

        if (confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "The confirmation password lenght must be greater than 2",
            });
        }

        if (password != confirmPassword) {
            errors.push(
                {
                    field: "password",
                    message: "The two passwords do not match",
                },
                {
                    field: "confirmPassword",
                    message: "The two passwords do not match",
                }
            );
        }

        let status = "";
        let user = null;

        if (payload) {
            if (origin === "dash") {
                user = await this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["posts", "issues", "comments"],
                });
            } else {
                user = await this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["comments"],
                });
            }
        }

        let valid = false;

        if (user) {
            valid = await argon2.verify(user.password, currentPassword);
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (!valid) {
            errors.push({
                field: "currentPassword",
                message: "Incorrect password",
            });
        } else if (errors.length === 0) {
            try {
                
                await this.userRepository.update(
                    {
                        id: payload.id,
                    },
                    {
                        password: await argon2.hash(password),
                    }
                );

                status = "The password has been changed.";
            } catch (error) {
                status =
                    "An error has occurred. Please try again later to change your account password.";
            }
        }

        return {
            status,
            errors,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changeRole(
        @Arg("id", () => Int) id: number,
        @Arg("role") role: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let user = null;
        let status = "";

        if (role === "Role" || role === "") {
            errors.push({
                field: "role",
                message: "The role field cannot take this value",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (errors.length === 0 && payload.role === "admin") {
            user = await this.userRepository.findOne({
                where: { id },
                relations: ["posts", "issues", "comments"],
            });

            if (user && user.email !== process.env.ADMIN_EMAIL) {
                try {
                    await this.userRepository.update(
                        {
                            id,
                        },
                        {
                            role,
                        },
                    );
    
                    status = "The user role has been changed.";
                } catch (error) {
                    console.log(error);
                    status =
                        "An error has occurred. Please try again later to change the user role.";
                }
            } else {
                status = "You can't change the role of this account.";
            }
        } else if (payload.role !== "admin") {
            status = "You are not authorized to change the role of another user.";
        }

        return {
            errors,
            user,
            status,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async deleteUserFromDashboard(
        @Arg("id", () => Int) id: number,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let status = "";

        const user = await this.userRepository.findOne({
            where: { id },
            relations: ["posts", "issues", "comments"],
        });

        if (!payload) {
            status = "You are not authenticated.";
        } else if (!user) {
            status = "This user doesn't exist.";
        } else if (user.email === process.env.ADMIN_EMAIL) {
            status = "You can't delete this account.";
        } else if (payload.role === "admin") {
            await this.userRepository.remove(user).then(async () => {
                if (user && user.profilePicture && user.profilePicture !== null && user.profilePicture !== "") {
                    const profilePictureName = user.profilePicture.replace(
                        "https://storage.ingrao.blog/",
                        "",
                    );
                    await axios.delete(`${process.env.STORAGE_LINK}/${profilePictureName}`);
                }

                const staff = await this.userRepository.findOne({ where: { email: process.env.ADMIN_EMAIL } });

                if (user && staff) {
                    for (const post of user.posts) {
                        post.author = staff;
                        post.authorId = staff.id;
                        
                        await post.save();
                    }

                    for (const issue of user.issues) {
                        issue.author = staff;
                        issue.authorId = staff.id;

                        await issue.save();
                    }
                }

                status = "This user has been deleted.";
            }).catch(() => {
                status = "An error has occurred while deleting this user. Please try again later.";
            });
        }

        return {
            status,
        };
    }

    @Mutation(() => ExtendedUserResponse)
    @UseMiddleware(isAuth)
    async deleteAccount(
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<ExtendedUserResponse> {
        let status = "";
        let ok = false;

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            let user: User | null = null;
            if (origin === "dash") {
                user = await this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["posts", "issues", "comments"],
                });
            } else {
                user = await this.userRepository.findOne({
                    where: { id: payload.id },
                    relations: ["comments"],
                });
            }

            let adminUsers = await this.userRepository.find({
                where: { role: "admin" }, 
            });

            if (payload.role === "admin" && (adminUsers.length - 1) === 0) {
                status = "You can't delete your account because you are the only admin of ingrao.blog.";
                ok = false;
            } else if (user && user.email === process.env.ADMIN_EMAIL) {
                status = "You can't delete this account.";
                ok = false;
            } else {
                try {
                    if (user) {
                        await this.userRepository.remove(user).then(async () => {
                            if (user && user.profilePicture && user.profilePicture !== null && user.profilePicture !== "") {
                                const profilePictureName = user.profilePicture.replace(
                                    "https://storage.ingrao.blog/",
                                    "",
                                );
                                await axios.delete(`${process.env.STORAGE_LINK}/${profilePictureName}`);
                            }

                            const staff = await this.userRepository.findOne({ where: { email: process.env.ADMIN_EMAIL } });

                            if (user && staff) {
                                for (const post of user.posts) {
                                    post.author = staff;
                                    post.authorId = staff.id;
                                    
                                    await post.save();
                                }

                                for (const issue of user.issues) {
                                    issue.author = staff;
                                    issue.authorId = staff.id;

                                    await issue.save();
                                }
                            }

                            status = "Your data has been deleted.";
                            ok = true;
                        }).catch(() => {
                            status = "An error has occurred while deleting your data. Please try again later.";
                            ok = false;
                        });
                    } else {
                        status = "An error has occurred while deleting your data. Please try again later.";
                        ok = false;
                    }
                } catch (error) {
                    console.error(error);
                    ok = false;
                }
            }
        }

        return {
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse, { nullable: true })
    async sendMessage(
        @Arg("name") name: string,
        @Arg("email") email: string,
        @Arg("subject") subject: string,
        @Arg("message") message: string,
    ): Promise<UserResponse> {
        const ses = new aws.SES({
            credentials: {
                accessKeyId: process.env.SES_KEY_ID as string,
                secretAccessKey: process.env.SES_SECRET_KEY as string,
            },
            region: "eu-south-1",
        });

        let errors = [];
        let status = "";

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (name === "" || name === null) {
            errors.push({
                field: "name",
                message: "The name field cannot be empty",
            });
        }
        if (subject === "" || subject === null) {
            errors.push({
                field: "subject",
                message: "The subject field cannot be empty",
            });
        }
        if (message === "" || message === null) {
            errors.push({
                field: "message",
                message: "The message field cannot be empty",
            });
        }

        if (errors.length === 0) {
            ejs.renderFile(
                path.join(
                    __dirname,
                    "../helpers/templates/MessageTemplate.ejs"
                ),
                {
                    name,
                    email,
                    subject,
                    message,
                },
                function (error, data) {
                    if (error) {
                        console.log(error);
                    } else {
                        const params: aws.SES.SendEmailRequest = {
                            Destination: {
                                ToAddresses: [process.env.PERSONAL_EMAIL!],
                            },
                            Message: {
                                Body: {
                                    Html: {
                                        Data: data,
                                    },
                                },
                                Subject: {
                                    Data: subject,
                                },
                            },
                            Source: "noreply@ingrao.blog",
                        };

                        status = "Your message has been sent.";

                        ses.sendEmail(params)
                            .promise()
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                }
            );
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async viewPage(
        @Arg("pathname", { nullable: false }) pathname: string,
        @Ctx() { payload, req }: AuthContext
    ) {
        const uniqueIdentifier = req.cookies["uid"];

        if (!uniqueIdentifier) {
            return false;
        }

        if (!payload) {
            await this.viewLogRepository.create({
                pathname,
                uniqueIdentifier,
                isAuth: false,
            }).save();

            return true;
        } else {
            await this.viewLogRepository.create({
                pathname,
                userId: payload.id,
                uniqueIdentifier,
                isAuth: true,
            }).save();

            return true;
        }
    }

    @Query(() => AnalyticsResponse)
    async summary() {
        let views = 0;
        let viewsVariation = 0;
        let uniqueVisitors = 0;
        let uniqueVisitorsVariation = 0;
        let viewsByDay: { date: string; views: number; }[] = [];

        const pinDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);

        const viewLogsDateArray = createDateArray(pinDate, new Date());

        const viewLogs = await this.viewLogRepository.find({
            where: {
                createdAt: MoreThan(pinDate)
            },
        });

        const startDate = new Date(Date.now() - 56 * 24 * 60 * 60 * 1000);

        const pastViewLogs = await this.viewLogRepository.find({
            where: {
                createdAt: And(MoreThan(startDate), LessThan(pinDate)),
            },
        });

        if (viewLogs && viewLogs.length > 0) {
            views = viewLogs.length;
            uniqueVisitors = new Set(viewLogs.map((viewLog) => viewLog.uniqueIdentifier)).size;
            viewsByDay = viewLogsDateArray.map((date) => {
                const formattedDate = date.toISOString().split("T")[0];
                const views = viewLogs.filter((log) => log.createdAt.toISOString().split("T")[0] === formattedDate).length;
            
                return {
                    date: formattedDate,
                    views: views,
                };
            });
            
            if (pastViewLogs && pastViewLogs.length > 0) {
                const pastViews = pastViewLogs.length;
    
                viewsVariation = ((views - pastViews) / pastViews) * 100;
            
                const pastUniqueVisitors = new Set(pastViewLogs.map((viewLog) => viewLog.uniqueIdentifier)).size;
    
                if (pastUniqueVisitors > 0) {
                    uniqueVisitorsVariation = ((uniqueVisitors - pastUniqueVisitors) / pastUniqueVisitors) * 100;
                }
            }
        }

        return {
            views,
            viewsByDay,
            viewsVariation,
            uniqueVisitors,
            uniqueVisitorsVariation,
        };
    }

    @Query(() => UserFrequenciesResponse)
    async userFrequencies() {
        const viewLogs = await this.viewLogRepository.find({
            where: {
                createdAt: MoreThan(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000))
            },
        });
    
        const userCounts = new Map<string, boolean>();
    
        for (const viewLog of viewLogs) {
            userCounts.set(viewLog.uniqueIdentifier, viewLog.isAuth);
        }
    
        let authenticatedUsers = 0;
        let unAuthenticatedUsers = 0;
    
        for (const isAuth of userCounts.values()) {
            if (isAuth) {
                authenticatedUsers++;
            } else {
                unAuthenticatedUsers++;
            }
        }
    
        return {
            authenticatedUsers,
            unAuthenticatedUsers,
        };
    }
}
