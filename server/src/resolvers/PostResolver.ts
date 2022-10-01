import { Post } from "../entities/Post";
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
    blogFeed() {
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

    @Query(() => [Post])
    @UseMiddleware(isAuth)
    postFeed(@Ctx() { payload }: MyContext) {
        return Post.find({
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

    @Query(() => [Post])
    dashPostFeed() {
        return Post.find({
            order: {
                updatedAt: "DESC",
            },
            relations: ["author"],
        });
    }

    @Query(() => [Post])
    @UseMiddleware(isAuth)
    draftPostFeed(@Ctx() { payload }: MyContext) {
        return Post.find({
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

    @Query(() => Post, { nullable: true })
    findPost(@Arg("id", () => Int, { nullable: true }) id: number) {
        return Post.findOne({ where: { id }, relations: ["author"] });
    }

    @Query(() => Post, { nullable: true })
    findPostBySlug(@Arg("slug", () => String, { nullable: true }) slug: string) {
        return Post.findOne({ where: { slug }, relations: ["author"] });
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("slug") slug: string,
        @Ctx() { payload }: MyContext
    ): Promise<PostResponse> {
        let errors = [];
        let post;
        let status;

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
            } else if (slug.includes("/") || (/\s/).test(slug)) {
                errors.push({
                    field: "slug",
                    message: "The slug field cannot accept this value",
                });
            } else {
                try {
                    post = await Post.create({
                        slug: slug.toLowerCase(),
                        draft: true,
                        authorId: payload.id,
                        author: await User.findOne({
                            where: { id: payload.id, role: payload.role },
                        }),
                    }).save();

                    status = "Post created successfully.";
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
            status,
        };
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async editUnpublishedPost(
        @Arg("postId", () => Int) postId: number,
        @Arg("slug") slug: string,
        @Arg("title", { nullable: true }) title: string,
        @Arg("description", { nullable: true }) description: string,
        @Arg("slogan", { nullable: true }) slogan: string,
        @Arg("postCover", { nullable: true }) postCover: string,
        @Arg("content", { nullable: true }) content: string,
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
            });

            if (!post) {
                status = "Post not found.";
            } else {
                if (slug === "" || slug === null) {
                    errors.push({
                        field: "slug",
                        message: "You can't update a post by deleting its slug",
                    });
                } else if (slug.includes("/") || (/\s/).test(slug)) {
                    errors.push({
                        field: "slug",
                        message: "The slug field cannot accept this value",
                    });
                } else {
                    try {
                        if (payload.role === "admin" && payload.id !== post.authorId) {
                            await Post.update(
                                {
                                    id: postId,
                                },
                                {
                                    slug: slug,
                                    draft: true,
                                    title: title,
                                    description: description,
                                    slogan: slogan,
                                    postCover: postCover,
                                    content: content,
                                }
                            );
                        } else {
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
                            field: "slug",
                            message:
                                "An error has occurred. Please try again later to update the post",
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

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async publishPost(
        @Arg("postId", () => Int) postId: number,
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
            });

            if (!post) {
                status = "Post not found.";
            } else {
                if (post.slug === "" || post.slug === null) {
                    errors.push({
                        field: "Slug",
                        message: "you can't publish a post without a slug",
                    });
                }
                if (post.title === "" || post.title === null) {
                    errors.push({
                        field: "Title",
                        message: "the title field cannot be empty",
                    });
                }
                if (post.description === "" || post.description === null) {
                    errors.push({
                        field: "Description",
                        message: "the description field cannot be empty",
                    });
                }
                if (post.slogan === "" || post.slogan === null) {
                    errors.push({
                        field: "Slogan",
                        message: "the slogan field cannot be empty",
                    });
                }
                if (post.postCover === "" || post.postCover === null) {
                    errors.push({
                        field: "Post cover",
                        message:
                            "you can't publish a post without a cover image",
                    });
                }
                if (post.content === "" || post.content === null) {
                    errors.push({
                        field: "Content",
                        message: "you can't publish a post without content",
                    });
                }

                if (errors.length === 0) {
                    if (payload.role === "admin" && payload.id !== post.authorId) {
                        await Post.update(
                            {
                                id: postId,
                            },
                            {
                                draft: false,
                            }
                        );
                    } else {
                        await Post.update(
                            {
                                id: postId,
                                authorId: payload.id,
                            },
                            {
                                draft: false,
                            }
                        );
                    }

                    status = "Your post is now online.";
                }
            }
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async editPublishedPost(
        @Arg("postId", () => Int) postId: number,
        @Arg("slug") slug: string,
        @Arg("title", { nullable: true }) title: string,
        @Arg("description", { nullable: true }) description: string,
        @Arg("slogan", { nullable: true }) slogan: string,
        @Arg("postCover", { nullable: true }) postCover: string,
        @Arg("content", { nullable: true }) content: string,
        @Ctx() { payload }: MyContext
    ): Promise<PostResponse> {
        let errors = [];
        let post;
        let status = "";

        if (!payload || (payload && payload.role === "user")) {
            status = "You are not authorizated to edit a published post.";
        } else {
            post = await Post.findOne({
                id: postId,
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
                if (slug.includes("/") || (/\s/).test(slug)) {
                    errors.push({
                        field: "slug",
                        message: "The slug field cannot accept this value",
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
                        message:
                            "You can't publish a post without a cover image",
                    });
                }
                if (content === "" || content === null) {
                    errors.push({
                        field: "content",
                        message: "You can't publish a post without content",
                    });
                }

                if (errors.length === 0) {
                    if (payload.role === "admin" && payload.id !== post.authorId) {
                        await Post.update(
                            {
                                id: postId,
                            },
                            {
                                slug: slug,
                                title: title,
                                description: description,
                                slogan: slogan,
                                postCover: postCover,
                                content: content,
                                draft: false,
                            }
                        );
                    } else {
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
                                draft: false,
                                author: await User.findOne({
                                    where: { id: payload.id, role: payload.role },
                                }),
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
    async unpublishPost(
        @Arg("postId", () => Int) postId: number,
        @Ctx() { payload }: MyContext
    ) {
        if (!payload || (payload && payload.role === "user")) {
            return false;
        }

        const post = await Post.findOne({
            id: postId,
        });

        if (!post) {
            return false;
        } else if (payload.role === "admin" && payload.id !== post.authorId) {
            await Post.update(
                {
                    id: postId,
                },
                {
                    draft: true,
                }
            );
        } else {
            await Post.update(
                {
                    id: postId,
                    authorId: payload.id,
                },
                {
                    draft: true,
                }
            );
        }

        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("postId", () => Int) postId: number,
        @Ctx() { payload }: MyContext
    ) {
        if (!payload || (payload && payload.role === "user")) {
            return false;
        }

        const post = await Post.findOne({
            id: postId,
        });

        if (!post) {
            return false;
        } else if (payload.role === "admin" && payload.id !== post.authorId) {
            await Post.delete({ id: postId }).catch(
                (error) => {
                    console.error(error);
                    return false;
                }
            );
        } else {
            await Post.delete({ id: postId, authorId: payload.id }).catch(
                (error) => {
                    console.error(error);
                    return false;
                }
            );
        }

        return true;
    }
}
