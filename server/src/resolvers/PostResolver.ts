import { Post } from "../entities/Post";
import {
    Arg,
    Ctx,
    Field,
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

@ObjectType()
export class PostResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Post, { nullable: true })
    post?: Post;

    @Field(() => String, { nullable: true })
    status?: string;
}

@Resolver(Post)
export class PostResolver {
    @Query(() => [Post])
    postFeed() {
        return Post.find({
            order: {
                createdAt: "DESC",
            },
            where: {
                draft: false,
            },
            relations: ["author"],
        });
    }

    @Query(() => Post, { nullable: true })
    findPost(@Arg("id", { nullable: true }) id: string) {
        return Post.findOne({ where: { id }, relations: ["author"] });
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("slug") slug: string,
        @Ctx() { payload }: MyContext
    ): Promise<PostResponse> {
        let errors = [];
        let post;

        if (!payload || (payload && payload.role === "user")) {
            errors.push({
                field: "slug",
                message: "You are not authorized to create a new post",
            });
        } else {
            if (slug === "" || slug === null) {
                errors.push({
                    field: "slug",
                    message: "You can't create a new post without a slug",
                });
            } else {
                try {
                    post = await Post.create({
                        slug: slug,
                        draft: true,
                        authorId: payload.id,
                        author: await User.findOne({ where: { id: payload.id, role: payload.role } }),
                    }).save();
                } catch (error) {
                    console.log(error);

                    errors.push({
                        field: "slug",
                        message:
                            "An error has occurred. Please try again later to create a new post",
                    });
                }
            }
        }

        return {
            post,
            errors,
        };
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg("postId") postId: number,
        @Arg("slug") slug: string,
        @Arg("title") title: string,
        @Arg("description") description: string,
        @Arg("slogan") slogan: string,
        @Arg("postCover") postCover: string,
        @Arg("content") content: string,
        @Ctx() { payload }: MyContext
    ): Promise<PostResponse> {
        let errors = [];
        let post;
        let status = "";

        if (!payload || (payload && payload.role === "user")) {
            errors.push({
                field: "slug",
                message: "You are not authorized to update a post",
            });
        } else {
            post = await Post.findOne({
                id: postId,
                authorId: payload.id,
            });

            if (!post) {
                status = "Post not found.";
            } else {
                if (slug === "" || slug === null) {
                    errors.push({
                        field: "slug",
                        message: "You can't update a post by deleting its slug",
                    });
                } else {
                    try {
                        await Post.update(
                        {
                            id: postId,
                            authorId: payload.id,
                        },
                        {
                            slug: slug,
                            draft: true,
                            title: title,
                            description: description,
                            slogan: slogan,
                            postCover: postCover,
                            content: content,
                            authorId: payload.id,
                            author: await User.findOne({ where: { id: payload.id, role: payload.role } }),
                        });
    
                        post = await Post.findOne({
                            id: postId,
                            authorId: payload.id,
                        });
    
                        status = "Your changes have been saved.";
                    } catch (error) {
                        console.log(error);
    
                        errors.push({
                            field: "slug",
                            message:
                                "An error has occurred. Please try again later to create a new post",
                        });
                    }
                }
            }
        }

        return {
            post,
            errors,
            status,
        };
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async publishPost(
        @Arg("postId") postId: number,
        @Arg("slug") slug: string,
        @Arg("title") title: string,
        @Arg("description") description: string,
        @Arg("slogan") slogan: string,
        @Arg("postCover") postCover: string,
        @Arg("content") content: string,
        @Ctx() { payload }: MyContext
    ): Promise<PostResponse> {
        let errors = [];
        let post;
        let status = "";

        if (!payload || (payload && payload.role === "user")) {
            status = "You are not authorizated to publish a post.";
        } else {
            post = await Post.findOne({
                id: postId,
                authorId: payload.id,
            });

            if (!post) {
                status = "Post not found.";
            } else {
                if (slug === "" || slug === null) {
                    errors.push({
                        field: "slug",
                        message: "You can't publish a post without a slug",
                    });
                }
                if (title === "" || title === null) {
                    errors.push({
                        field: "title",
                        message: "The title field cannot be empty",
                    });
                }
                if (description === "" || description === null) {
                    errors.push({
                        field: "description",
                        message: "The description field cannot be empty",
                    });
                }
                if (slogan === "" || slogan === null) {
                    errors.push({
                        field: "slogan",
                        message: "The slogan field cannot be empty",
                    });
                }
                if (postCover === "" || postCover === null) {
                    errors.push({
                        field: "postCover",
                        message: "You can't publish a post without a cover image",
                    });
                }
                if (content === "" || content === null) {
                    errors.push({
                        field: "content",
                        message: "You can't publish a post without content",
                    });
                }

                if (errors.length === 0) {
                    await Post.update(
                    {
                        id: postId,
                        authorId: payload.id,
                    },
                    {
                        slug: slug,
                        title: title,
                        description: description,
                        slogan: slogan,
                        postCover: postCover,
                        content: content,
                        authorId: payload.id,
                        draft: false,
                        author: await User.findOne({ where: { id: payload.id, role: payload.role } }),
                    });

                    status = "Your post is now online.";
                }
            }
        }

        return {
            post,
            errors,
            status,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("postId") postId: number,
        @Ctx() { payload }: MyContext
    ) {
        if (!payload || (payload && payload.role === "user")) {
            return false;
        }

        await Post.delete({ id: postId, authorId: payload.id }).catch((error) => {
            console.error(error);
            return false;
        });

        return true;
    }
}
