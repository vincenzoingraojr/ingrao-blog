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

    @Field()
    @Column({ unique: true, nullable: false })
    slug: string;

    @Field(() => Boolean)
    @Column({ nullable: false })
    draft: boolean;

    @Field()
    @Column()
    authorId: number;
    
    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    slogan: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    postCover: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @Field()
    @Column()
    content: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
