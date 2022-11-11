import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDeletePostMutation, useUnpublishPostMutation } from "../../../generated/graphql";
import postCover from "../../../images/post-cover.svg";
import { PageText, TextButton } from "../../../styles/global";
import { processDate } from "../../../utils/processDate";

interface SmallPostComponentProps {
    post: any;
}

const SmallPostContainer = styled.div`
    display: block;
    width: 100%;
    cursor: pointer;
`;

const SmallPostInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const SmallPostImage = styled.div`
    display: block;
    width: 128px;
    height: 128px;

    img {
        width: inherit;
        height: inherit;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
    }
`;

const SmallPostBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SmallPostHeader = styled.div`
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

const SmallPostTitle = styled(PageText)`
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

const UnpublishPostButton = styled(TextButton)`
    color: #000000;
`;

const SmallPostComponent: FunctionComponent<SmallPostComponentProps> = ({
    post,
}) => {
    const navigate = useNavigate();

    let date = "";

    if (post.draft) {
        date = processDate(post.updatedAt);
    } else {
        date = new Date(parseInt(post.updatedAt)).toLocaleString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    const [deletePost] = useDeletePostMutation();
    const [unpublishPost] = useUnpublishPostMutation();

    return (
        <SmallPostContainer
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
            <SmallPostInnerContainer>
                <SmallPostImage>
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
                </SmallPostImage>
                <SmallPostBody>
                    <SmallPostHeader>
                        <HeadText>
                            {post.draft ? (
                                <>Unpublished post: {post.id}</>
                            ) : (
                                <>{post.slogan}</>
                            )}
                        </HeadText>
                    </SmallPostHeader>
                    <SmallPostTitle>
                        {post.title !== null && post.title !== "" ? (
                            <>{post.title}</>
                        ) : (
                            <>{post.slug}</>
                        )}
                    </SmallPostTitle>
                    <PostSmallText>
                        {post.draft ? <>Updated</> : <>Published on</>} {date}, by {post.author.firstName} {post.author.lastName}
                    </PostSmallText>
                    <PostButtonsContainer>
                        {post.draft ? (
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
                        ) : (
                            <UnpublishPostButton
                                type="button"
                                role="button"
                                title="Unpublish post"
                                aria-label="Unpublish post"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    unpublishPost({
                                        variables: {
                                            postId: post.id,
                                        },
                                    }).then(() => {
                                        navigate(0);
                                    });
                                }}
                            >
                                Unpublish post
                            </UnpublishPostButton>
                        )}
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
                </SmallPostBody>
            </SmallPostInnerContainer>
        </SmallPostContainer>
    );
};

export default SmallPostComponent;
