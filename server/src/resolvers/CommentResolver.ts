import { Comment } from "../entities/Comment";
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
import { getConnection } from "typeorm";

@ObjectType()
export class CommentResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Comment, { nullable: true })
    comment?: Comment;

    @Field(() => String, { nullable: true })
    status?: string;
}

@Resolver(Comment)
export class CommentResolver {
    @Query(() => [Comment])
    postComments(
        @Arg("postId", () => Int, { nullable: true }) postId: number
    ) {
        return Comment.find({
            order: {
                createdAt: "DESC",
            },
            where: {
                postId
            },
            relations: ["author"],
        });
    }

    @Query(() => [Comment])
    commentReplies(
        @Arg("commentId", () => String) commentId: string
    ) {
        return Comment.find({
            order: {
                createdAt: "ASC",
            },
            where: {
                isReplyTo: commentId,
            },
            relations: ["author"],
        });
    }

    @Query(() => [Comment])
    @UseMiddleware(isAuth)
    personalComments(
        @Ctx() { payload }: MyContext
    ) {
        return Comment.find({
            order: {
                createdAt: "DESC",
            },
            where: {
                authorId: payload?.id,
            },
            relations: ["author"],
        });
    }

    @Mutation(() => CommentResponse)
    @UseMiddleware(isAuth)
    async createComment(
        @Arg("content") content: string,
        @Arg("postId", () => Int) postId: number,
        @Arg("isReplyTo", () => String) isReplyTo: string,
        @Ctx() { payload }: MyContext
    ): Promise<CommentResponse> {
        let errors = [];
        let comment;

        if (content === "" || content === null) {
            errors.push({
                field: "content",
                message: "You can't publish a comment without content",
            });
        }

        if (!payload) {
            errors.push({
                field: "content",
                message: "You are not authorized to comment on this post",
            });
        } else if (errors.length === 0) {
            try {
                comment = await Comment.create({
                    content: content,
                    commentId: uuidv4(),
                    postId: postId,
                    authorId: payload!.id,
                    isReplyTo: isReplyTo,
                    author: await User.findOne({ where: { id: payload.id, role: payload.role } }),
                    isDeleted: false,
                }).save();
            } catch (error) {
                console.log(error);
                errors.push({
                    field: "content",
                    message:
                        "An error has occurred. Please try again later to publish a comment",
                });
            }
        }

        return {
            comment,
            errors,
        };
    }

    @Mutation(() => CommentResponse)
    @UseMiddleware(isAuth)
    async updateComment(
        @Arg("commentId") commentId: string,
        @Arg("content") content: string,
        @Ctx() { payload }: MyContext
    ): Promise<CommentResponse> {
        let errors = [];
        let comment;

        if (content == "" || content == null) {
            errors.push({
                field: "content",
                message: "You can't update a comment by removing the content",
            });
        }

        if (!payload) {
            errors.push({
                field: "content",
                message: "You are not authorized to update this comment",
            });
        } else if (errors.length === 0) {
            try {
                const result = await getConnection()
                    .createQueryBuilder()
                    .update(Comment)
                    .set({ content })
                    .where("commentId = :commentId and authorId = :authorId", {
                        commentId,
                        authorId: payload?.id,
                    })
                    .returning("*")
                    .execute();

                comment = result.raw[0];
            } catch (error) {
                console.log(error);
                errors.push({
                    field: "content",
                    message:
                        "An error has occurred. Please try again later to update your comment",
                });
            }
        }

        return {
            comment,
            errors,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteComment(
        @Arg("commentId") commentId: string,
        @Arg("hasReplies") hasReplies: boolean,
        @Ctx() { payload }: MyContext
    ) {
        if (!payload) {
            return false;
        }

        if (hasReplies) {
            await Comment.update(
                {
                    commentId,
                    authorId: payload.id,
                },
                {
                    isDeleted: true,
                },
            ).catch((error) => {
                console.error(error);
                return false;
            });
        } else {
            await Comment.delete({ commentId, authorId: payload.id }).catch((error) => {
                console.error(error);
                return false;
            });
        }

        return true;
    }
}
