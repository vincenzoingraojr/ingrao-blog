import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity,
    OneToMany,
    UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    firstName: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    lastName: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: true, default: "" })
    password: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    title: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    gender: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    birthDate: Date;

    @Field(() => [Post], { nullable: true, defaultValue: [] })
    @OneToMany(() => Post, (post) => post.author, { nullable: true })
    posts: Post[];

    @Field(() => Boolean, { nullable: false })
    @Column({ nullable: false })
    verified: boolean;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    role: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    profilePicture: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Boolean, { nullable: false })
    @Column({ nullable: false })
    newsletterSubscribed: boolean;

    @Column("int", { default: 0 })
    tokenVersion: number;
}
