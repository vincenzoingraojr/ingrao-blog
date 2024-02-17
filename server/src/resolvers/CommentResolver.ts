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
import { AuthContext } from "../types";
import { User } from "../entities/User";
import { v4 as uuidv4 } from "uuid";
import { Repository } from "typeorm";
import appDataSource from "../dataSource";

@ObjectType()
export class CommentResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Comment, { nullable: true })
    comment?: Comment | null;

    @Field(() => String, { nullable: true })
    status?: string;
}

@Resolver(Comment)
export class CommentResolver {
    private readonly commentRepository: Repository<Comment>;
    private readonly userRepository: Repository<User>;

    constructor() {
        this.commentRepository = appDataSource.getRepository(Comment);
        this.userRepository = appDataSource.getRepository(User);
    }
    
    @Query(() => [Comment])
    postComments(
        @Arg("postId", () => Int, { nullable: true }) postId: number
    ) {
        return this.commentRepository.find({
            order: {
                createdAt: "DESC",
            },
            where: {
                postId,
                isReplyTo: "",
            },
            relations: ["author"],
        });
    }

    @Query(() => [Comment])
    commentReplies(
        @Arg("commentId", () => String) commentId: string
    ) {
        return this.commentRepository.find({
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
        @Ctx() { payload }: AuthContext
    ) {
        if (payload) {
            return this.commentRepository.find({
                order: {
                    createdAt: "DESC",
                },
                where: {
                    authorId: payload.id,
                },
                relations: ["author"],
            });
        } else {
            return [];
        }
    }

    @Mutation(() => CommentResponse)
    @UseMiddleware(isAuth)
    async createComment(
        @Arg("content") content: string,
        @Arg("postId", () => Int) postId: number,
        @Arg("isReplyTo", () => String) isReplyTo: string,
        @Ctx() { payload }: AuthContext
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
        } else if (errors.length === 0 && payload) {
            try {
                comment = await this.commentRepository.create({
                    content,
                    commentId: uuidv4(),
                    postId,
                    authorId: payload.id,
                    isReplyTo,
                    author: await this.userRepository.findOne({ where: { id: payload.id, role: payload.role } }) as User,
                    isDeleted: false,
                    isEdited: false,
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
        @Ctx() { payload }: AuthContext
    ): Promise<CommentResponse> {
        let errors = [];
        let comment;

        if (content === "" || content === null) {
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
                await this.commentRepository.update(
                    {
                        commentId,
                        authorId: payload.id,
                    },
                    {
                        content,
                        isEdited: true,
                    },
                );
                
                comment = await this.commentRepository.findOne({ where: { commentId, authorId: payload.id }, relations: ["author"] });
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
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        }

        if (hasReplies) {
            await this.commentRepository.update(
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
            await this.commentRepository.delete({ commentId, authorId: payload.id }).catch((error) => {
                console.error(error);
                return false;
            });
        }

        return true;
    }
}
