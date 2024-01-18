import { Newsletter } from "../entities/Newsletter";
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
import { FieldError } from "./common";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { v4 as uuidv4 } from "uuid";
import aws from "aws-sdk";
import ejs from "ejs";
import path from "path";
import { UserResponse } from "./UserResolver";
import draftToHtml from "draftjs-to-html";

@ObjectType()
export class NewsletterResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Newsletter, { nullable: true })
    issue?: Newsletter;

    @Field(() => String, { nullable: true })
    status?: string;
}

@Resolver(Newsletter)
export class NewsletterResolver {
    @Query(() => [Newsletter])
    newsletterBlogFeed() {
        return Newsletter.find({
            order: {
                createdAt: "DESC",
            },
            where: {
                draft: false,
            },
            relations: ["author"],
        });
    }

    @Query(() => [Newsletter])
    @UseMiddleware(isAuth)
    newsletterPersonalFeed(@Ctx() { payload }: MyContext) {
        return Newsletter.find({
            order: {
                createdAt: "DESC",
            },
            where: {
                authorId: payload?.id,
                draft: false,
            },
            relations: ["author"],
        });
    }

    @Query(() => [Newsletter])
    dashNewsletterFeed() {
        return Newsletter.find({
            order: {
                updatedAt: "DESC",
            },
            relations: ["author"],
        });
    }

    @Query(() => [Newsletter])
    @UseMiddleware(isAuth)
    draftNewsletterFeed(@Ctx() { payload }: MyContext) {
        return Newsletter.find({
            order: {
                updatedAt: "DESC",
            },
            where: {
                authorId: payload?.id,
                draft: true,
            },
            relations: ["author"],
        });
    }

    @Query(() => Newsletter, { nullable: true })
    findNewsletterIssue(@Arg("id", () => Int, { nullable: true }) id: number) {
        return Newsletter.findOne({ where: { id }, relations: ["author"] });
    }

    @Query(() => Newsletter, { nullable: true })
    findNewsletterById(@Arg("newsletterId", () => String, { nullable: true }) newsletterId: string) {
        return Newsletter.findOne({ where: { newsletterId }, relations: ["author"] });
    }

    @Query(() => [User])
    subscribedUsers() {
        return User.find({
            order: {
                updatedAt: "DESC",
            },
            where: {
                newsletterSubscribed: true,
            },
            relations: ["posts", "issues"],
        });
    }

    @Mutation(() => NewsletterResponse)
    @UseMiddleware(isAuth)
    async createIssue(
        @Arg("title") title: string,
        @Ctx() { payload }: MyContext
    ): Promise<NewsletterResponse> {
        let errors = [];
        let issue;
        let status;

        if (!payload || (payload && payload.role === "user")) {
            errors.push({
                field: "title",
                message: "You are not authorized to create a new newsletter issue",
            });
        } else {
            if (title === "" || title === null) {
                errors.push({
                    field: "title",
                    message: "You can't create a new issue without a title",
                });
            } else {
                try {
                    issue = await Newsletter.create({
                        title: title,
                        draft: true,
                        newsletterId: uuidv4(),
                        authorId: payload.id,
                        author: await User.findOne({
                            where: { id: payload.id, role: payload.role },
                        }),
                        isEdited: false,
                    }).save();

                    status = "Newsletter issue created successfully.";
                } catch (error) {
                    console.log(error);

                    errors.push({
                        field: "title",
                        message:
                            "An error has occurred. Please try again later to create a new issue",
                    });
                }
            }
        }

        return {
            issue,
            errors,
            status,
        };
    }

    @Mutation(() => NewsletterResponse)
    @UseMiddleware(isAuth)
    async editUnpublishedIssue(
        @Arg("newsletterId") newsletterId: string,
        @Arg("title", { nullable: true }) title: string,
        @Arg("subject", { nullable: true }) subject: string,
        @Arg("newsletterCover", { nullable: true }) newsletterCover: string,
        @Arg("content", { nullable: true }) content: string,
        @Ctx() { payload }: MyContext
    ): Promise<NewsletterResponse> {
        let errors = [];
        let issue;
        let status = "";

        if (!payload || (payload && payload.role === "user")) {
            errors.push({
                field: "title",
                message: "You are not authorized to update a newsletter issue",
            });
        } else {
            issue = await Newsletter.findOne({
                newsletterId: newsletterId,
            });

            if (!issue) {
                status = "Newsletter issue not found.";
            } else {
                if (title === "" || title === null) {
                    errors.push({
                        field: "title",
                        message: "You can't update a issue by deleting its title",
                    });
                } else {
                    try {
                        if (payload.role === "admin" && payload.id !== issue.authorId) {
                            await Newsletter.update(
                                {
                                    newsletterId: newsletterId,
                                },
                                {
                                    draft: true,
                                    title: title,
                                    subject: subject,
                                    newsletterCover: newsletterCover,
                                    content: content,
                                }
                            );
                        } else {
                            await Newsletter.update(
                                {
                                    authorId: payload.id,
                                    newsletterId: newsletterId,
                                },
                                {
                                    draft: true,
                                    title: title,
                                    subject: subject,
                                    newsletterCover: newsletterCover,
                                    content: content,
                                    author: await User.findOne({
                                        where: {
                                            id: payload.id,
                                            role: payload.role,
                                        },
                                    }),
                                }
                            );
                        }

                        status = "Your changes have been saved.";
                    } catch (error) {
                        console.log(error);

                        errors.push({
                            field: "title",
                            message:
                                "An error has occurred. Please try again later to update the issue",
                        });
                    }
                }
            }
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => NewsletterResponse)
    @UseMiddleware(isAuth)
    async publishIssue(
        @Arg("newsletterId", () => String) newsletterId: string,
        @Ctx() { payload }: MyContext
    ): Promise<NewsletterResponse> {
        let errors = [];
        let issue: Newsletter | undefined;
        let status = "";

        const ses = new aws.SES({
            credentials: {
                accessKeyId: process.env.SES_KEY_ID!,
                secretAccessKey: process.env.SES_SECRET_KEY!,
            },
            region: "eu-south-1",
        });

        if (!payload || (payload && payload.role === "user")) {
            status = "You are not authorizated to publish a newsletter issue.";
        } else {
            issue = await Newsletter.findOne({
                where: {
                    newsletterId: newsletterId,
                },
                relations: ["author"],
            });

            if (!issue) {
                status = "Newsletter issue not found.";
            } else {
                if (issue.title === "" || issue.title === null) {
                    errors.push({
                        field: "Title",
                        message: "you can't publish a newsletter issue without a title",
                    });
                }
                if (issue.subject === "" || issue.subject === null) {
                    errors.push({
                        field: "Subject",
                        message: "the subject field cannot be empty",
                    });
                }
                if (issue.newsletterCover === "" || issue.newsletterCover === null) {
                    errors.push({
                        field: "Newsletter cover",
                        message:
                            "you can't publish a newsletter issue without a cover image",
                    });
                }
                if (issue.content === "" || issue.content === null) {
                    errors.push({
                        field: "Content",
                        message: "you can't publish a newsletter issue without content",
                    });
                }

                if (errors.length === 0) {
                    if (payload.role === "admin" && payload.id !== issue.authorId) {
                        await Newsletter.update(
                            {
                                newsletterId: newsletterId,
                            },
                            {
                                draft: false,
                            }
                        );
                    } else {
                        await Newsletter.update(
                            {
                                newsletterId: newsletterId,
                                authorId: payload.id,
                            },
                            {
                                draft: false,
                            }
                        );
                    }

                    const link = `https://ingrao.blog/newsletter/issue/${issue.newsletterId}`;
                    const fullName = `${issue.author.firstName} ${issue.author.lastName}`;

                    const newsletterUsers = await User.find({
                        where: {
                            newsletterSubscribed: true,
                        },
                    });

                    const emailAddresses = newsletterUsers.map(function (user) {
                        return user["email"];
                    });

                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/NewsletterIssue.ejs"
                        ),
                        { link: link, title: issue.title, newsletterCover: issue.newsletterCover, fullName: fullName, content: draftToHtml(JSON.parse(issue.content))},
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else {
                                const params: aws.SES.SendEmailRequest = {
                                    Destination: {
                                        ToAddresses: emailAddresses,
                                    },
                                    Message: {
                                        Body: {
                                            Html: {
                                                Data: data,
                                            },
                                        },
                                        Subject: {
                                            Data: issue?.subject!,
                                        },
                                    },
                                    Source: "ingrao.blog <newsletter@ingrao.blog>",
                                    ReplyToAddresses: ["info@ingrao.blog"],
                                };
        
                                ses.sendEmail(params)
                                    .promise()
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            }
                        }
                    );

                    status = "Your newsletter issue is now online.";
                }
            }
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => NewsletterResponse)
    @UseMiddleware(isAuth)
    async editPublishedIssue(
        @Arg("newsletterId") newsletterId: string,
        @Arg("title", { nullable: true }) title: string,
        @Arg("subject", { nullable: true }) subject: string,
        @Arg("newsletterCover", { nullable: true }) newsletterCover: string,
        @Arg("content", { nullable: true }) content: string,
        @Ctx() { payload }: MyContext
    ): Promise<NewsletterResponse> {
        let errors = [];
        let issue;
        let status = "";

        if (!payload || (payload && payload.role === "user")) {
            status = "You are not authorizated to edit a published issue.";
        } else {
            issue = await Newsletter.findOne({
                newsletterId: newsletterId,
            });

            if (!issue) {
                status = "Newsletter issue not found.";
            } else {
                if (title === "" || title === null) {
                    errors.push({
                        field: "title",
                        message: "The title field cannot be empty",
                    });
                }
                if (subject === "" || subject === null) {
                    errors.push({
                        field: "subject",
                        message: "The subject field cannot be empty",
                    });
                }
                if (newsletterCover === "" || newsletterCover === null) {
                    errors.push({
                        field: "newsletterCover",
                        message:
                            "You can't publish a newsletter issue without a cover image",
                    });
                }
                if (content === "" || content === null) {
                    errors.push({
                        field: "content",
                        message: "You can't publish a newsletter issue without content",
                    });
                }

                if (errors.length === 0) {
                    if (payload.role === "admin" && payload.id !== issue.authorId) {
                        await Newsletter.update(
                            {
                                newsletterId: newsletterId,
                            },
                            {
                                title: title,
                                subject: subject,
                                newsletterCover: newsletterCover,
                                content: content,
                                draft: false,
                                isEdited: true,
                            }
                        );
                    } else {
                        await Newsletter.update(
                            {
                                authorId: payload.id,
                                newsletterId: newsletterId,
                            },
                            {
                                title: title,
                                subject: subject,
                                newsletterCover: newsletterCover,
                                content: content,
                                draft: false,
                                author: await User.findOne({
                                    where: { id: payload.id, role: payload.role },
                                }),
                                isEdited: true,
                            }
                        );
                    }

                    status = "Your changes are now online.";
                }
            }
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async unpublishIssue(
        @Arg("id", () => Int) id: number,
        @Ctx() { payload }: MyContext
    ) {
        if (!payload || (payload && payload.role === "user")) {
            return false;
        }

        const issue = await Newsletter.findOne({
            id: id,
        });

        if (!issue) {
            return false;
        } else if (payload.role === "admin" && payload.id !== issue.authorId) {
            await Newsletter.update(
                {
                    id: id,
                },
                {
                    draft: true,
                    isEdited: false,
                }
            );
        } else {
            await Newsletter.update(
                {
                    id: id,
                    authorId: payload.id,
                },
                {
                    draft: true,
                    isEdited: false,
                }
            );
        }

        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteIssue(
        @Arg("id", () => Int) id: number,
        @Ctx() { payload }: MyContext
    ) {
        if (!payload || (payload && payload.role === "user")) {
            return false;
        }

        const issue = await Newsletter.findOne({
            id: id,
        });

        if (!issue) {
            return false;
        } else if (payload.role === "admin" && payload.id !== issue.authorId) {
            await Newsletter.delete({ id: id }).catch(
                (error) => {
                    console.error(error);
                    return false;
                }
            );
        } else {
            await Newsletter.delete({ id: id, authorId: payload.id }).catch(
                (error) => {
                    console.error(error);
                    return false;
                }
            );
        }

        return true;
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async subscribeToNewsletter(
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let status = "";
        let user;
        if (!payload) {
            status = "You're not authorized to do this action.";
        } else {
            await User.update(
                {
                    id: payload.id,
                },
                {
                    newsletterSubscribed: true,
                }
            );

            user = await User.findOne({ where: { id: payload.id } });
            status = "You're now subscribed to the newsletter.";
        }

        return {
            status,
            user,
        }
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async unsubscribeFromNewsletter(
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let status = "";
        let user;
        if (!payload) {
            status = "You're not authorized to do this action.";
        } else {
            await User.update(
                {
                    id: payload.id,
                },
                {
                    newsletterSubscribed: false,
                }
            );

            user = await User.findOne({ where: { id: payload.id } });
            status = "You're no longer subscribed to the newsletter.";
        }

        return {
            status,
            user,
        }
    }
}
