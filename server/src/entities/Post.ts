import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    slug: string;

    @Field(() => Boolean, { nullable: false })
    @Column({ nullable: false })
    draft: boolean;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    authorId: number;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    title: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    description: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    slogan: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    postCover: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    author: User;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    content: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
