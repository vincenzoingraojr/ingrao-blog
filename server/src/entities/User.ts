import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    gender: string;

    @Field(() => String)
    @CreateDateColumn()
    birthDate: Date;

    @Field(() => [Post], { nullable: true })
    @OneToMany(() => Post, (post) => post.author, { nullable: true })
    posts: Post[];

    @Field()
    @Column()
    verified: boolean;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    role: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    profilePicture: string;

    @Column("int", { default: 0 })
    tokenVersion: number;
}
