import { Post } from "../entities/Post";
import { MigrationInterface, QueryRunner } from "typeorm";

export class PublishedOn1707430115593 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const postRepository = queryRunner.manager.getRepository(Post);

        const posts = await postRepository.find({ where: { draft: false } });

        if (posts.length > 0) {
            for (const post of posts) {
                if (!post.publishedOn) {
                    post.publishedOn = post.createdAt;
                    await post.save();
                }
            }
        }
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
    }
}
