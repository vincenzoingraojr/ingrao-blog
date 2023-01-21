import { Editor } from "@ingrao-blog/editor";
import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { PostCommentsDocument, PostCommentsQuery, useDeleteCommentMutation, useMeQuery, usePostCommentsQuery } from "../../../generated/graphql";
import profilePicture from "../../../images/profile-picture.svg";
import { PageText, TextButton } from "../../../styles/global";

interface CommentComponentProps {
    comment: any;
    postId: number;
}

const CommentComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const CommentUserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const CommentUserProfilePicture = styled.div`
    display: block;
    width: 48px;
    height: 49px;
    border-radius: 9999px;

    img {
        width: inherit;
        height: inherit;
        border-radius: 9999px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
    }
`;

const CommentUserInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

const CommentUserFullName = styled(PageText)`
    font-weight: 700;
    font-size: 20px;
`;

const CommentUserStaff = styled(PageText)`
    padding: 4px;
    font-size: 16px;
    color: #ffffff;
    background-color: #000000;
`;

const CommentContentContainer = styled.div`
    display: block;
`;

const CommentContent = styled.div`
    display: block;
    font-family: "Source Serif Pro", serif;
    margin-left: 64px;
`;

const CommentOptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 64px;
    gap: 16px;
`;

const ReplyCommentButton = styled(TextButton)`
    color: blue;
`;

const EditCommentButton = styled(TextButton)`
    color: black;
`;

const DeleteCommentButton = styled(TextButton)`
    color: red;
`;

const CommentComponent: FunctionComponent<CommentComponentProps> = ({ comment, postId }) => {
    const [commentContent, setCommentContent] = useState<any | undefined>(
        undefined
    );
    const [contentReady, setContentReady] = useState(false);

    useEffect(() => {
        const content = comment.content;

        if (content) {
            setContentReady(true);
            setCommentContent(JSON.parse(content));
        } else {
            setContentReady(false);
            setCommentContent(undefined);
        }
    }, [comment.content]);

    const { data: meData } = useMeQuery({
        fetchPolicy: "cache-and-network",
        variables: { origin: "blog" },
    });

    const [deleteComment] = useDeleteCommentMutation();
    const { data: postCommentsData } = usePostCommentsQuery({ variables: { postId }, fetchPolicy: "network-only" });

    return (
        <CommentComponentContainer>
            <CommentUserContainer>
                <CommentUserProfilePicture>
                    <img
                        src={
                            comment.author.profilePicture !== null && comment.author.profilePicture !== ""
                                ? comment.author.profilePicture
                                : profilePicture
                        }
                        title={`${comment.author.firstName}'s profile picture`}
                        alt={`${comment.author.firstName} ${comment.author.lastName}`}
                    />
                </CommentUserProfilePicture>
                <CommentUserInfo>
                    <CommentUserFullName>
                        {comment.author.firstName}{" "}{comment.author.lastName}
                    </CommentUserFullName>
                    {(comment.author.role === "admin" || comment.author.role === "writer") && (
                        <CommentUserStaff>
                            Staff
                        </CommentUserStaff>
                    )}
                </CommentUserInfo>
            </CommentUserContainer>
            <CommentContentContainer>
                {contentReady && (
                    <CommentContent>
                        <Editor
                            readOnly={true}
                            toolbarHidden={true}
                            initialContentState={commentContent}
                        />
                    </CommentContent>
                )}
            </CommentContentContainer>
            <CommentOptionsContainer>
                <ReplyCommentButton
                    type="button"
                    role="button"
                    title="Reply to the comment"
                    aria-label="Reply to the comment"
                >
                    Reply
                </ReplyCommentButton>
                {meData && (
                    <>
                        <EditCommentButton
                            type="button"
                            role="button"
                            title="Edit comment"
                            aria-label="Edit comment"
                        >
                            Edit comment
                        </EditCommentButton>
                        <DeleteCommentButton
                            type="button"
                            role="button"
                            title="Delete comment"
                            aria-label="Delete comment"
                            onClick={async () => {
                                await deleteComment({
                                    variables: {
                                        commentId: comment.commentId,
                                        hasReplies: false,
                                    },
                                    update: (store, { data }) => {
                                        if (
                                            data &&
                                            data.deleteComment
                                        ) {
                                            const commentsData = postCommentsData?.postComments || [];
                                            const selectedComment = commentsData.find((item) => item.id === comment.id);
                                            const index = commentsData.indexOf(selectedComment!);
                                            commentsData.splice(index!, 1);
                                            
                                            store.writeQuery<PostCommentsQuery>({
                                                query: PostCommentsDocument,
                                                data: {
                                                    postComments: commentsData,
                                                },
                                            });
                                        }
                                    },
                                });                                  
                            }}
                        >
                            Delete comment
                        </DeleteCommentButton>
                    </>
                )}
            </CommentOptionsContainer>
        </CommentComponentContainer>
    );
}

export default CommentComponent;