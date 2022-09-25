import { Form, Formik } from "formik";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import {
    useFindPostQuery,
    useMeQuery,
    usePublishPostMutation,
} from "../../generated/graphql";
import {
    Button,
    FlexContainer24,
    FlexRow24,
    LinkButton,
    ModalContentContainer,
    PageBlock,
    PageTextMB24,
    Status,
} from "../../styles/global";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Head from "../../components/Head";

const PublishPostButton = styled(Button)`
    background-color: #000000;
    color: #ffffff;
`;

const ViewPostButton = styled(LinkButton)`
    background-color: blue;
    color: #ffffff;
`;

const EditPostButton = styled(LinkButton)`
    color: #ffffff;
    background-color: blue;
`;

function PublishPost() {
    const navigate = useNavigate();

    const {
        data: meData,
        loading: meLoading,
        error: meError,
    } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    const params = useParams();

    const { data, loading, error } = useFindPostQuery({
        fetchPolicy: "network-only",
        variables: { id: parseInt(params.id!) },
    });

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findPost && data.findPost.draft) {
                console.log("Post found.");
            } else {
                navigate("/");
            }
        } else {
            console.log("Loading...");
        }
    }, [navigate, data, loading, error]);

    const [publishPost] = usePublishPostMutation();

    const [errors, setErrors] = useState<any>(null);

    return (
        <>
            <Head
                title="Publish this post | dashboard.ingrao.blog"
                description="In this page you can publish this post."
            />
            {(meLoading && !meData) || meError ? (
                <ModalLoading />
            ) : (
                <ModalContentContainer>
                    <PageTextMB24>
                        Publish this post. Before publishing the post, make sure
                        that every field is compiled, otherwise you won't be
                        able to publish the post.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            postId: parseInt(params.id!),
                        }}
                        onSubmit={async (values, { setStatus }) => {
                            const response = await publishPost({
                                variables: values,
                            });

                            if (
                                response.data?.publishPost?.errors?.length === 0
                            ) {
                                setStatus(response.data?.publishPost?.status);
                                setErrors(null);
                            } else {
                                setStatus(null);
                                setErrors(response.data?.publishPost?.errors!);
                            }
                        }}
                    >
                        {({ status }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <FlexContainer24>
                                    {errors &&
                                        errors.map(
                                            (
                                                error: {
                                                    field: string;
                                                    message: string;
                                                },
                                                i: React.Key | number | null
                                            ) => (
                                                <PageBlock key={i}>
                                                    {error.field}:{" "}
                                                    {error.message}.
                                                </PageBlock>
                                            )
                                        )}
                                    <FlexRow24>
                                        <PageBlock>
                                            <PublishPostButton
                                                type="submit"
                                                title="Publish post"
                                                role="button"
                                                aria-label="Publish post"
                                            >
                                                Publish post
                                            </PublishPostButton>
                                        </PageBlock>
                                        {errors && (
                                            <PageBlock>
                                                <EditPostButton
                                                    to={`/update-post/${params.id}`}
                                                    title="Update post"
                                                >
                                                    Update post
                                                </EditPostButton>
                                            </PageBlock>
                                        )}
                                        {status && (
                                            <PageBlock>
                                                <ViewPostButton
                                                    to={`/post/${data?.findPost?.slug}`}
                                                    title="View post"
                                                >
                                                    View post
                                                </ViewPostButton>
                                            </PageBlock>
                                        )}
                                    </FlexRow24>
                                </FlexContainer24>
                            </Form>
                        )}
                    </Formik>
                </ModalContentContainer>
            )}
        </>
    );
}

export default PublishPost;
