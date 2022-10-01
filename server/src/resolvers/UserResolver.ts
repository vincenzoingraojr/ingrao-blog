import { User } from "../entities/User";
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
import { getConnection, getRepository} from "typeorm";
import argon2 from "argon2";
import { MyContext } from "../types";
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

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => String, { nullable: true })
    accessToken?: string;

    @Field(() => String, { nullable: true })
    status?: string;
}

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    me(@Arg("origin") origin: string, @Ctx() context: MyContext) {
        const authorization = context.req.headers["authorization"];

        let user;

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );

            if (origin === "dash") {
                user = User.findOne({
                    where: { id: payload.id },
                    relations: ["posts"],
                });
            } else {
                user = User.findOne({
                    where: { id: payload.id },
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
        return User.findOne({ where: { id }, relations: ["posts"] });
    }

    @Query(() => [User])
    dashUsers() {
        return getRepository(User)
            .createQueryBuilder()
            .where("role != :role", { role: "user" })
            .getMany();
    }

    @Mutation(() => UserResponse, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Arg("origin") origin: string,
        @Ctx() { res }: MyContext
    ): Promise<UserResponse> {
        const ses = new aws.SES({
            credentials: {
                accessKeyId: process.env.SES_KEY_ID!,
                secretAccessKey: process.env.SES_SECRET_KEY!,
            },
            region: "eu-south-1",
        });

        let errors = [];
        let user;
        let accessToken;
        let status;

        if (origin === "dash") {
            user = await User.findOne({
                where: { email: email },
                relations: ["posts"],
            });
        } else {
            user = await User.findOne({
                where: { email: email },
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
                origin === "dash"
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

                            ses.sendEmail(params)
                                .promise()
                                .then(() => {
                                    status =
                                        "You should now receive an email containing the instructions to set up a password.";
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                    }
                );
            } else {
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

        let user;
        let status;
        const hashedPassword = await argon2.hash(password);

        if (errors.length === 0) {
            try {
                const result = await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values({
                        email: email,
                        password: hashedPassword,
                        firstName: firstName,
                        lastName: lastName,
                        title: title,
                        gender: gender,
                        birthDate: birthDate,
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
    async logout(@Ctx() { res }: MyContext) {
        sendRefreshToken(res, "");

        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("id", () => Number) id: number) {
        await getConnection()
            .getRepository(User)
            .increment({ id: id }, "tokenVersion", 1);

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
                process.env.ACCESS_TOKEN_SECRET!
            );
            await User.update(
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
        let user;
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
                    process.env.ACCESS_TOKEN_SECRET!
                );
                await User.update(
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
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        const ses = new aws.SES({
            credentials: {
                accessKeyId: process.env.SES_KEY_ID!,
                secretAccessKey: process.env.SES_SECRET_KEY!,
            },
            region: "eu-south-1",
        });

        let errors = [];
        let user;
        let status;

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
                    const result = await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(User)
                        .values({
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            title: title,
                            gender: gender,
                            birthDate: birthDate,
                            role: role,
                            verified: true,
                        })
                        .returning("*")
                        .execute();
                    user = result.raw[0];
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

                                ses.sendEmail(params)
                                    .promise()
                                    .then(() => {
                                        status =
                                            "The new user should now receive an email containing the instructions to set up a password.";
                                    })
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
                    process.env.ACCESS_TOKEN_SECRET!
                );
                await User.update(
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
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let status = "";

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
                message: "The gender field cannot take this value",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (errors.length === 0) {
            try {
                await User.update(
                    {
                        id: payload.id,
                    },
                    {
                        firstName: firstName,
                        lastName: lastName,
                        profilePicture: profilePicture,
                        title: title,
                        gender: gender,
                    },
                );

                if (origin === "dash") {
                    user = await User.findOne({
                        where: { id: payload.id },
                        relations: ["posts"],
                    });
                } else {
                    user = await User.findOne({
                        where: { id: payload.id },
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
        @Ctx() { payload }: MyContext
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
        let user;
        if (origin === "dash") {
            user = await User.findOne({
                where: { id: payload?.id },
                relations: ["posts"],
            });
        } else {
            user = await User.findOne({
                where: { id: payload?.id },
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (user && user.email === email) {
            errors.push({
                field: "email",
                message: "The email address you entered is the one you are already using",
            });
        } else if (errors.length === 0) {
            const token = createAccessToken(user!);
            const link = `${
                origin === "dash"
                    ? process.env.DASHBOARD_ORIGIN
                    : process.env.CLIENT_ORIGIN
            }/settings/account/verify-email/${token}`;

            try {
                await User.update(
                    {
                        id: payload.id,
                    },
                    {
                        email: email,
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

        return {
            status,
            errors,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async authSendVerificationEmail(
        @Arg("origin") origin: string,
        @Ctx() { payload }: MyContext
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
        
        let user: User | undefined;
        if (origin === "dash") {
            user = await User.findOne({
                where: { id: payload?.id },
                relations: ["posts"],
            });
        } else {
            user = await User.findOne({
                where: { id: payload?.id },
                relations: ["posts"],
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (user) {
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
                        } else {
                            transporter.sendMail({
                                from: "Support Team | ingrao.blog <support@ingrao.blog>",
                                to: user?.email,
                                subject: "Verify your email address",
                                html: data,
                            });
                            status =
                                "Check your inbox, we just sent you an email with the instructions to verify your email address.";
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                status = "Could not send the email, check your internet connection.";
            }
        }

        return {
            status
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changePassword(
        @Arg("existingPassword") existingPassword: string,
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Arg("origin") origin: string,
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let errors = [];

        if (existingPassword.length <= 2) {
            errors.push({
                field: "existingPassword",
                message: "The existing password lenght must be greater than 2",
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
        let user;
        if (origin === "dash") {
            user = await User.findOne({
                where: { id: payload?.id },
                relations: ["posts"],
            });
        } else {
            user = await User.findOne({
                where: { id: payload?.id },
                relations: ["posts"],
            });
        }

        let valid = false;

        if (user) {
            valid = await argon2.verify(user.password, password);
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (!valid) {
            errors.push({
                field: "existingPassword",
                message: "Incorrect password",
            });
        } else if (errors.length === 0) {
            try {
                
                await User.update(
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
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let errors = [];
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
            try {
                await User.update(
                    {
                        id: id,
                    },
                    {
                        role: role
                    },
                );

                status = "The user role has been changed.";
            } catch (error) {
                console.log(error);
                status =
                    "An error has occurred. Please try again later to change the user role.";
            }
        } else if (payload.role !== "admin") {
            status = "You are not authorized to change the role of another user.";
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async deleteUserFromDashboard(
        @Arg("id", () => Int) id: number,
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let status = "";

        const user = await User.findOne({
            where: { id: id },
            relations: ["posts"],
        });

        if (!payload) {
            status = "You are not authenticated.";
        } else if (!user) {
            status = "This user doesn't exist.";
        } else if (payload.role === "admin") {
            await User.remove(user).then(() => {
                status = "This user has been deleted.";
            }).catch(() => {
                status = "An error has occurred while deleting this user. Please try again later.";
            });
        }

        return {
            status,
        };
    }
}
