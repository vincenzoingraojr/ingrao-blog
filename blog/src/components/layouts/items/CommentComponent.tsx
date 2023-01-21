import { Editor } from "@ingrao-blog/editor";
import { Form, Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { PostCommentsDocument, PostCommentsQuery, useDeleteCommentMutation, useMeQuery, usePostCommentsQuery, useUpdateCommentMutation } from "../../../generated/graphql";
import profilePicture from "../../../images/profile-picture.svg";
import { Button, FlexContainer24, PageBlock, PageText, Status, TextButton } from "../../../styles/global";
import { toErrorMap } from "../../../utils/toErrorMap";
import EditorField from "../../input/content/EditorField";

interface CommentComponentProps {
    comment: any;
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

const UpdateCommentButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
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

    const [editCommentEditor, setEditCommentEditor] = useState(false);

    const [updateComment] = useUpdateCommentMutation();

    let date = new Date(parseInt(comment.createdAt)).toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

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
                        <CommentDate>
                            {date}
                        </CommentDate>
                    </CommentInfoContainer>
                </CommentUserContainer>
                <CommentContentContainer>
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
                                onClick={() => {
                                    setEditCommentEditor(!editCommentEditor);
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
                                                    variables: {
                                                        postId: postId,
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
            {editCommentEditor && (
                <EditCommentEditorContainer key={comment.commentId}>
                    <Formik
                        initialValues={{
                            content: comment.content,
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
                                        const commentsData = postCommentsData?.postComments || [];
                                        const selectedComment = commentsData.find((item) => item.id === comment.id);
                                        const index = commentsData.indexOf(selectedComment!);
                                        commentsData.splice(index!, 1);
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
                                },
                            });

                            if (
                                response.data?.updateComment.errors &&
                                response.data.updateComment.errors.length !== 0
                            ) {
                                setStatus(null);
                                setErrors(toErrorMap(response.data.updateComment.errors));
                            } else {
                                setStatus("Your comment has been updated.");
                            }
                        }}
                    >
                        {({
                            errors,
                            status,
                        }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
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
        </CommentBox>
    );
}

export default CommentComponent;