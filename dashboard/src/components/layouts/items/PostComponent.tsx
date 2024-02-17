import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Post, useDeletePostMutation } from "../../../generated/graphql";
import postCover from "../../../images/cover.svg";
import { PageText, TextButton } from "../../../styles/global";
import { processDate } from "../../../utils/processDate";

interface PostComponentProps {
    post: Post;
}

const PostContainer = styled.div`
    display: block;
    width: 100%;
    cursor: pointer;
`;

const PostInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const HeadText = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 4px solid #000000;
`;

const PostImage = styled.div`
    display: block;
    width: 100%;
    height: 100%;

    img {
        width: inherit;
        height: inherit;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
    }
`;

const PostBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const PostTitle = styled(PageText)`
    font-weight: 700;
    font-size: 24px;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`;

const PostSmallText = styled(PageText)`
    font-size: 16px;
`;

const PostButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 16px;
    column-gap: 12px;
    row-gap: 4px;
`;

const ViewPostButton = styled(TextButton)`
    color: blue;
`;

const DeletePostButton = styled(TextButton)`
    color: red;
`;

const PostComponent: FunctionComponent<PostComponentProps> = ({
    post,
}) => {
    const navigate = useNavigate();

    let date = "";

    if (post.draft) {
        date = processDate(post.updatedAt);
    } else {
        const publishDate = new Date(parseInt(post.publishedOn as string)).toLocaleString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });

        if (post.isEdited) {
            const updatedPostDate = processDate(post.updatedAt);
            date = publishDate + ", updated " + updatedPostDate;
        } else {
            date = publishDate;
        }
    }

    const [deletePost] = useDeletePostMutation();

    return (
        <PostContainer
            onClick={() => {
                navigate(
                    post.draft ? `/update-post/${post.id}` : `/post/${post.slug}`
                );
            }}
            role="link"
            title={post.draft ? `Unpublished post: ${post.id}` : `${post.title}`}
            aria-label={
                post.draft ? `Unpublished post: ${post.id}` : `${post.title}`
            }
        >
            <PostInnerContainer>
                <PostHeader>
                    <HeadText>
                        {post.draft ? (
                            <>Unpublished post: {post.id}</>
                        ) : (
                            <>{post.slogan}</>
                        )}
                    </HeadText>
                </PostHeader>
                <PostImage>
                    <img
                        src={
                            post.postCover !== null && post.postCover !== ""
                                ? post.postCover
                                : postCover
                        }
                        title={
                            post.draft
                                ? `Unpublished post (${post.id}) cover image`
                                : `${post.title}`
                        }
                        alt={
                            post.draft
                                ? `Unpublished post (${post.id}) cover`
                                : `${post.title}`
                        }
                    />
                </PostImage>
                <PostBody>
                    <PostTitle>
                        {post.title && post.title.length > 0 ? (
                            <>{post.title}</>
                        ) : (
                            <>{post.slug}</>
                        )}
                    </PostTitle>
                    {post.description && (
                        <PageText>{post.description}</PageText>
                    )}
                    <PostSmallText>
                        Written by{" "}
                        <b>
                            {post.author.firstName} {post.author.lastName}
                        </b>
                    </PostSmallText>
                    <PostSmallText>
                        {post.draft ? <>Updated</> : <>Published on</>} {date}
                    </PostSmallText>
                    {post.draft && (
                        <PostButtonsContainer>
                            <ViewPostButton
                                type="button"
                                role="button"
                                title="View post"
                                aria-label="View post"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/update-post/${post.id}/preview`);
                                }}
                            >
                                View post
                            </ViewPostButton>
                            <DeletePostButton
                                type="button"
                                role="button"
                                title="Delete post"
                                aria-label="Delete post"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deletePost({
                                        variables: {
                                            postId: post.id,
                                        },
                                    }).then(() => {
                                        navigate(0);
                                    });
                                }}
                            >
                                Delete post
                            </DeletePostButton>
                        </PostButtonsContainer>
                    )}
                </PostBody>
            </PostInnerContainer>
        </PostContainer>
    );
};

export default PostComponent;
