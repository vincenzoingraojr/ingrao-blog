import { FunctionComponent } from "react";
import styled from "styled-components";
import { CommentRepliesDocument, CommentRepliesQuery, PostCommentsDocument, PostCommentsQuery, useCommentRepliesQuery, useCreateCommentMutation } from "../../generated/graphql";
import { Form, Formik } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import EditorField from "../input/content/EditorField";
import { Button, FlexContainer24, PageBlock, Status } from "../../styles/global";

interface CommentInputComponentProps {
    commentsData: any;
    postId: number;
    isReplyTo: string;
}

const CreateCommentComponent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const CreateCommentButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

const CommentInputComponent: FunctionComponent<CommentInputComponentProps> = ({ postId, commentsData, isReplyTo }) => {
    const [createComment] = useCreateCommentMutation();
    const { data: commentRepliesData } = useCommentRepliesQuery({ variables: { commentId: isReplyTo }, fetchPolicy: "network-only" });

    return (
        <CreateCommentComponent>
            <Formik
                initialValues={{
                    content: "",
                    postId: postId,
                    isReplyTo: isReplyTo,
                }}
                onSubmit={async (values, { setErrors, setStatus }) => {
                    const response = await createComment({
                        variables: values,
                        update: (store, { data }) => {
                            if (
                                data &&
                                data.createComment &&
                                data.createComment.comment
                            ) {
                                if (values.isReplyTo === "") {
                                    store.writeQuery<PostCommentsQuery>({
                                        query: PostCommentsDocument,
                                        data: {
                                            postComments: [
                                                data.createComment.comment,
                                                ...commentsData,
                                            ],
                                        },
                                        variables: {
                                            postId: postId,
                                        },
                                    });
                                } else {
                                    if (commentRepliesData) {
                                        store.writeQuery<CommentRepliesQuery>({
                                            query: CommentRepliesDocument,
                                            data: {
                                                commentReplies: [
                                                    data.createComment.comment,
                                                    ...commentRepliesData.commentReplies,
                                                ],
                                            },
                                            variables: {
                                                postId: postId,
                                                commentId: values.isReplyTo,
                                            },
                                        });
                                    }
                                }
                            }
                        },
                    });

                    if (response.data) {
                        if (
                            response.data.createComment.errors &&
                            response.data.createComment.errors.length > 0
                        ) {
                            setStatus(null);
                            setErrors(toErrorMap(response.data.createComment.errors));
                        } else {
                            setStatus("Your comment has been published.");
                        }
                    }
                }}
            >
                {({
                    errors,
                    status
                }) => (
                    <Form>
                        {status && <Status>{status}</Status>}
                        <FlexContainer24>
                            <EditorField
                                field="content"
                                itemId={postId}
                                errors={
                                    errors
                                }
                            />
                            <PageBlock>
                                <CreateCommentButton
                                    type="submit"
                                    title="Publish comment"
                                    role="button"
                                    aria-label="Publish comment"
                                >
                                    Publish comment
                                </CreateCommentButton>
                            </PageBlock>
                        </FlexContainer24>
                    </Form>
                )}
            </Formik>
        </CreateCommentComponent>
    );
}

export default CommentInputComponent;