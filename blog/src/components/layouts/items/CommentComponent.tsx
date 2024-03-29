import { Editor } from "@ingrao-blog/editor";
import { Form, Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Comment, CommentRepliesDocument, CommentRepliesQuery, PostCommentsDocument, PostCommentsQuery, useCommentRepliesQuery, useDeleteCommentMutation, useMeQuery, usePostCommentsQuery, useUpdateCommentMutation } from "../../../generated/graphql";
import profilePicture from "../../../images/profile-picture.svg";
import { Button, FlexContainer24, PageBlock, PageText, Status, TextButton } from "../../../styles/global";
import { toErrorMap } from "../../../utils/toErrorMap";
import EditorField from "../../input/content/EditorField";
import CommentInputComponent from "../../utils/CommentInputComponent";
import { processDate } from "../../../utils/processDate";

interface CommentComponentProps {
    comment: Comment;
    postId: number;
}

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

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

const CommentInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
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

const CommentDate = styled(PageText)`
    font-size: 16px;
    color: #c0c0c0;
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

const EditCommentEditorContainer = styled.div`
    display: block;
    margin-left: 64px;
`;

const ReplyCommentEditorContainer = styled.div`
    display: block;
    margin-left: 64px;
`;

const UpdateCommentButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

const CommentReplies = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-left: 12px;
    border-left: 2px solid black;
    margin-left: 64px;
`;

const CommentComponent: FunctionComponent<CommentComponentProps> = ({ comment, postId }) => {
    const [commentContent, setCommentContent] = useState<Comment | undefined>(
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

    const [editCommentEditor, setEditCommentEditor] = useState(false);
    const [replyCommentEditor, setReplyCommentEditor] = useState(false);

    const [updateComment] = useUpdateCommentMutation();
    const [date, setDate] = useState("");

    useEffect(() => {
        if (comment) {
            const publishDate = new Date(parseInt(comment.createdAt)).toLocaleString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            });

            if (comment.isEdited) {
                const updatedCommentDate = processDate(comment.updatedAt);
                setDate(`${publishDate}, updated ${updatedCommentDate}`);
            } else {
                setDate(publishDate);
            }
        }
    }, [comment]);

    const { data: commentRepliesData } = useCommentRepliesQuery({ variables: { commentId: comment.commentId }, fetchPolicy: "network-only" });

    const navigate = useNavigate();

    return (
        <CommentBox>
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
                    <CommentInfoContainer>
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
                        {!comment.isDeleted && (
                            <CommentDate>
                                {date}
                            </CommentDate>
                        )}
                    </CommentInfoContainer>
                </CommentUserContainer>
                <CommentContentContainer>
                    {!comment.isDeleted ? (
                        <>
                            {contentReady && (
                                <CommentContent>
                                    <Editor
                                        readOnly={true}
                                        toolbarHidden={true}
                                        initialContentState={commentContent}
                                        contentState={commentContent}
                                    />
                                </CommentContent>
                            )}
                        </>
                    ) : (
                        <CommentContent>
                            <i>The comment has been deleted.</i>
                        </CommentContent>
                    )}
                </CommentContentContainer>
                <CommentOptionsContainer>
                    <ReplyCommentButton
                        type="button"
                        role="button"
                        title="Reply to the comment"
                        aria-label="Reply to the comment"
                        onClick={() => {
                            setReplyCommentEditor(!replyCommentEditor);
                            setEditCommentEditor(false);
                        }}
                    >
                        Reply
                    </ReplyCommentButton>
                    {meData && meData.me && (meData.me.id === comment.authorId) && (
                        <>
                            <EditCommentButton
                                type="button"
                                role="button"
                                title="Edit comment"
                                aria-label="Edit comment"
                                onClick={() => {
                                    setEditCommentEditor(!editCommentEditor);
                                    setReplyCommentEditor(false);
                                }}
                            >
                                Edit comment
                            </EditCommentButton>
                            <DeleteCommentButton
                                type="button"
                                role="button"
                                title="Delete comment"
                                aria-label="Delete comment"
                                onClick={async () => {
                                    let hasReplies = false;

                                    if (commentRepliesData && commentRepliesData.commentReplies.length > 0) {
                                        hasReplies = true;
                                    }

                                    await deleteComment({
                                        variables: {
                                            commentId: comment.commentId,
                                            hasReplies: hasReplies,
                                        },
                                        update: (store, { data }) => {
                                            if (
                                                data &&
                                                data.deleteComment &&
                                                !hasReplies
                                            ) {
                                                if (comment.isReplyTo === "") {
                                                    if (postCommentsData) {
                                                        const commentsData = postCommentsData.postComments || [];
                                                        const selectedComment = commentsData.find((item) => item.id === comment.id);
                                                        const index = commentsData.indexOf(selectedComment as Comment);
                                                        commentsData.splice(index, 1);
                                                        
                                                        store.writeQuery<PostCommentsQuery>({
                                                            query: PostCommentsDocument,
                                                            data: {
                                                                postComments: commentsData,
                                                            },
                                                            variables: {
                                                                postId: postId,
                                                            },
                                                        });
                                                    }
                                                } else {
                                                    if (commentRepliesData) {
                                                        const commentsData = commentRepliesData.commentReplies || [];
                                                        const selectedComment = commentsData.find((item) => item.id === comment.id);
                                                        const index = commentsData.indexOf(selectedComment as Comment);
                                                        commentsData.splice(index, 1);
                                                        
                                                        store.writeQuery<CommentRepliesQuery>({
                                                            query: CommentRepliesDocument,
                                                            data: {
                                                                commentReplies: commentsData,
                                                            },
                                                            variables: {
                                                                postId: postId,
                                                                commentId: comment.isReplyTo,
                                                            },
                                                        });
                                                    }
                                                }
                                            }
                                        },
                                    });
                                    
                                    if (hasReplies) {
                                        navigate(0);
                                    }
                                }}
                            >
                                Delete comment
                            </DeleteCommentButton>
                        </>
                    )}
                </CommentOptionsContainer>
            </CommentComponentContainer>
            {editCommentEditor && (
                <EditCommentEditorContainer key={comment.commentId}>
                    <Formik
                        initialValues={{
                            content: comment.content as string,
                            commentId: comment.commentId,
                        }}
                        onSubmit={async (values, { setErrors, setStatus }) => {
                            const response = await updateComment({
                                variables: values,
                                update: (store, { data }) => {
                                    if (
                                        data &&
                                        data.updateComment &&
                                        data.updateComment.comment
                                    ) {
                                        if (postCommentsData && postCommentsData.postComments) {
                                            const commentsData = postCommentsData.postComments || [];
                                            const selectedComment = commentsData.find((item) => item.id === comment.id);
                                            const index = commentsData.indexOf(selectedComment as Comment);
                                            commentsData.splice(index, 1);
                                            commentsData.push(data.updateComment.comment);

                                            store.writeQuery<PostCommentsQuery>({
                                                query: PostCommentsDocument,
                                                data: {
                                                    postComments: commentsData,
                                                },
                                                variables: {
                                                    postId: postId,
                                                },
                                            });
                                        }
                                    }
                                },
                            });


                            if (response.data) {
                                if (
                                    response.data.updateComment.errors &&
                                    response.data.updateComment.errors.length > 0
                                ) {
                                    setStatus(null);
                                    setErrors(toErrorMap(response.data.updateComment.errors));
                                } else {
                                    setStatus("Your comment has been updated.");
                                }
                            } else {
                                setStatus("An unknown error has occurred. Please try again later.");
                            }
                        }}
                    >
                        {({
                            errors,
                            status,
                        }) => (
                            <Form>
                                {status && (<Status>{status}</Status>)}
                                <FlexContainer24>
                                    <EditorField
                                        field="content"
                                        itemId={postId}
                                        errors={
                                            errors
                                        }
                                    />
                                    <PageBlock>
                                        <UpdateCommentButton
                                            type="submit"
                                            title="Update comment"
                                            role="button"
                                            aria-label="Update comment"
                                        >
                                            Update comment
                                        </UpdateCommentButton>
                                    </PageBlock>
                                </FlexContainer24>
                            </Form>
                        )}
                    </Formik>
                </EditCommentEditorContainer>
            )}
            {(replyCommentEditor && postCommentsData) && (
                <ReplyCommentEditorContainer>
                    <CommentInputComponent postId={postId} commentsData={postCommentsData.postComments} isReplyTo={comment.commentId} />
                </ReplyCommentEditorContainer>
            )}
            {(commentRepliesData && commentRepliesData.commentReplies.length > 0) && (
                <CommentReplies>
                    {commentRepliesData.commentReplies.map(
                        (comment) => (
                            <CommentComponent
                                key={
                                    comment.id
                                }
                                postId={postId}
                                comment={comment}
                            />
                        )
                    )}
                </CommentReplies>
            )}
        </CommentBox>
    );
}

export default CommentComponent;