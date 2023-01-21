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
@Entity("comments")
export class Comment extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    commentId: string;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    postId: number;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    authorId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
    author: User;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    isReplyTo: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    content: string;

    @Field(() => Boolean, { nullable: false })
    @Column({ nullable: false })
    isDeleted: boolean;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
