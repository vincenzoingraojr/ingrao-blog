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

    @Field(() => Boolean, { nullable: false})
    @Column({ nullable: false })
    draft: boolean;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    authorId: number;
    
    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true })
    title: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true })
    description: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true })
    slogan: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true })
    postCover: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true })
    content: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
