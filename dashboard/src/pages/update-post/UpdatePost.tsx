import { Form, Formik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Head from "../../components/Head";
import InputField from "../../components/input/InputField";
import FocusPageLayout from "../../components/layouts/FocusPageLayout";
import { TabLayoutTitle } from "../../components/layouts/sublayouts/TabLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import {
    useFindPostQuery,
    useEditUnpublishedPostMutation,
} from "../../generated/graphql";
import {
    Button,
    FlexContainer24,
    FlexRow24,
    LinkButton,
    LoadingContainer,
    PageBlock,
    Status,
} from "../../styles/global";
import { toErrorMap } from "../../utils/toErrorMap";
import UpdatePostComponent from "./UpdatePostComponent";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import EditorField from "../../components/input/content/EditorField";
import { debounceAsync } from "../../utils/debounceAsync";
import AutoSave from "../../components/input/content/AutoSave";

const PostFormContainer = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto;

    @media ${devices.tablet} {
        grid-template-columns: 600px auto;
    }
`;

const UpdatePostButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

const PublishPostButton = styled(LinkButton)`
    color: #ffffff;
    background-color: #000000;
`;

function UpdatePost() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { data, loading, error } = useFindPostQuery({
        fetchPolicy: "network-only",
        variables: { id: parseInt(params.id!) },
    });

    const [updatePost] = useEditUnpublishedPostMutation();

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findPost) {
                console.log("Post found.");
            } else {
                navigate("/");
            }
        } else {
            console.log("Loading...");
        }
    }, [navigate, data, loading, error]);

    const submitPost = useCallback(
        async (values: any, { setErrors, setStatus }: any) => {
            const response = await updatePost({
                variables: values,
            });

            if (response.data?.editUnpublishedPost.status) {
                setStatus(response.data.editUnpublishedPost.status);
            } else if (
                response.data?.editUnpublishedPost.errors?.length !== 0
            ) {
                setStatus(null);
                setErrors(
                    toErrorMap(response.data?.editUnpublishedPost?.errors!)
                );
            }
        },
        [updatePost]
    );

    const onSubmitDebounced = useMemo(() => {
        return debounceAsync(submitPost, 400);
    }, [submitPost]);

    return (
        <>
            <Head
                title="Update a post | dashboard.ingrao.blog"
                description="In this page you can update a post."
            />
            <FocusPageLayout
                title={`Update post ${params.id}`}
                content={
                    <UpdatePostComponent
                        id={params.id!}
                        content={
                            <>
                                {(loading && !data) || error ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <>
                                        <TabLayoutTitle>
                                            Update post {params.id}
                                        </TabLayoutTitle>
                                        <PostFormContainer>
                                            <Formik
                                                initialValues={{
                                                    postId: parseInt(
                                                        params.id!
                                                    ),
                                                    slug: data?.findPost?.slug!,
                                                    title: data?.findPost
                                                        ?.title,
                                                    description:
                                                        data?.findPost
                                                            ?.description,
                                                    slogan: data?.findPost
                                                        ?.slogan,
                                                    postCover:
                                                        data?.findPost
                                                            ?.postCover,
                                                    content:
                                                        data?.findPost?.content,
                                                }}
                                                onSubmit={onSubmitDebounced}
                                            >
                                                {({
                                                    errors,
                                                    status,
                                                    values,
                                                    submitForm,
                                                }) => (
                                                    <Form>
                                                        <PageBlock>
                                                            {status ? (
                                                                <Status>
                                                                    {status}
                                                                </Status>
                                                            ) : null}
                                                            <FlexContainer24>
                                                                <InputField
                                                                    field="slug"
                                                                    type="text"
                                                                    placeholder="Slug"
                                                                    value={
                                                                        values.slug
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
                                                                />
                                                                <InputField
                                                                    field="title"
                                                                    type="text"
                                                                    placeholder="Title"
                                                                    value={
                                                                        values.title ||
                                                                        ""
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
                                                                />
                                                                <InputField
                                                                    field="description"
                                                                    type="text"
                                                                    placeholder="Description"
                                                                    value={
                                                                        values.description ||
                                                                        ""
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
                                                                />
                                                                <InputField
                                                                    field="slogan"
                                                                    type="text"
                                                                    placeholder="Slogan"
                                                                    value={
                                                                        values.slogan ||
                                                                        ""
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
                                                                />
                                                                <EditorField
                                                                    field="content"
                                                                    errors={
                                                                        errors
                                                                    }
                                                                />
                                                                <AutoSave
                                                                    onSubmit={
                                                                        submitForm
                                                                    }
                                                                />
                                                                <PageBlock>
                                                                    <FlexRow24>
                                                                        <PageBlock>
                                                                            <UpdatePostButton
                                                                                type="submit"
                                                                                title="Update post"
                                                                                role="button"
                                                                                aria-label="Update post"
                                                                            >
                                                                                Update
                                                                                post
                                                                            </UpdatePostButton>
                                                                        </PageBlock>
                                                                        <PageBlock>
                                                                            <PublishPostButton
                                                                                to={`/publish-post/${params.id}`}
                                                                                title="Publish post"
                                                                                state={{
                                                                                    backgroundLocation: location,
                                                                                }}
                                                                            >
                                                                                Publish post
                                                                            </PublishPostButton>
                                                                        </PageBlock>
                                                                    </FlexRow24>
                                                                    <Outlet />
                                                                </PageBlock>
                                                            </FlexContainer24>
                                                        </PageBlock>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </PostFormContainer>
                                    </>
                                )}
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default UpdatePost;
