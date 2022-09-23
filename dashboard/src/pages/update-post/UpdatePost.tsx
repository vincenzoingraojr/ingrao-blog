import { Form, Formik } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    ImageButtonContainer,
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
import postCover from "../../images/post-cover.svg";
import Close from "../../components/icons/Close";
import Upload from "../../components/icons/Upload";

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

const CoverImageContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: #151414;
    width: 100%;
    height: 360px;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

    img {
        width: 100%;
        height: 360px;
        opacity: 0.6;
        object-fit: cover;
        object-position: center;
    }
`;

const CoverImageButtonsContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    z-index: 1000;
`;

const UploadCoverImageButton = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;

    input[type="file"] {
        position: absolute;
        width: 40px;
        height: 40px;
        visibility: hidden;
    }
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

    const [selectedPostCover, setSelectedPostCover] = useState<File | null>(
        null
    );

    const uploadPostCoverRef = useRef<HTMLInputElement>(null);
    const postCoverRef = useRef<HTMLImageElement>(null);
    const [deletePostCover, setDeletePostCover] = useState<boolean>(false);

    const [isPostCoverUploaded, setIsPostCoverUploaded] =
        useState<boolean>(false);

    console.log(deletePostCover, isPostCoverUploaded);

    const submitPost = useCallback(
        async (values: any, { setErrors, setStatus }: any) => {
            if (selectedPostCover !== null) {
                if (data?.findPost?.postCover !== "" && data?.findPost?.postCover !== null) {
                    let existingPostCoverName =
                    data?.findPost?.postCover?.replace(
                        `https://storage.ingrao.blog/${
                            process.env.REACT_APP_ENV === "development"
                                ? "local-post"
                                : "post"
                        }/${data?.findPost?.id}/`,
                        ""
                    )!;

                    await fetch(`https://storage-ingrao-blog.s3.eu-south-1.amazonaws.com/${process.env.REACT_APP_ENV === "development" ? "local-post" : "post"}/${data?.findPost?.id}/${existingPostCoverName}`, {
                        method: "DELETE",
                    });
                }

                let directory = process.env.REACT_APP_ENV === "development" ? `local-post/${data?.findPost?.id}` : `post/${data?.findPost?.id}`;
                let postCoverName = `post-cover-${new Date().getTime()}.jpeg`;

                let key = `${directory}/${postCoverName}`;

                const { url } = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/presigned-url`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        key: key,
                    }),
                }).then(res => res.json());

                console.log(url);

                await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: selectedPostCover,
                });
            }

            const response = await updatePost({
                variables: {
                    postId: parseInt(params.id!),
                    slug: values.slug,
                    title: values.title,
                    description: values.description,
                    slogan: values.slogan,
                    content: values.content,
                    postCover: values.postCover,
                }
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
        [updatePost, selectedPostCover, data?.findPost?.postCover]
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
                                                        <CoverImageContainer>
                                                            <CoverImageButtonsContainer>
                                                                <UploadCoverImageButton
                                                                    role="button"
                                                                    title="Upload your post cover image"
                                                                    aria-label="Upload your post cover image"
                                                                    onClick={() => {
                                                                        if (
                                                                            uploadPostCoverRef.current
                                                                        ) {
                                                                            uploadPostCoverRef.current.click();
                                                                        }
                                                                    }}
                                                                >
                                                                    <input
                                                                        type="file"
                                                                        name="post-cover"
                                                                        ref={
                                                                            uploadPostCoverRef
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) => {
                                                                            let localPostCover =
                                                                                null;
                                                                            localPostCover =
                                                                                event
                                                                                    .target
                                                                                    .files![0];
                                                                            setSelectedPostCover(
                                                                                localPostCover
                                                                            );
                                                                            setDeletePostCover(
                                                                                false
                                                                            );
                                                                            setIsPostCoverUploaded(
                                                                                true
                                                                            );
                                                                            if (
                                                                                postCoverRef &&
                                                                                postCoverRef.current
                                                                            ) {
                                                                                if (localPostCover !== undefined) {
                                                                                    postCoverRef.current.src =
                                                                                        URL.createObjectURL(
                                                                                            localPostCover
                                                                                        );
                                                                                } else {
                                                                                    postCoverRef.current.src =
                                                                                        postCover;
                                                                                }
                                                                            }
                                                                        }}
                                                                        accept="image/png , image/jpeg, image/webp"
                                                                    />
                                                                    <ImageButtonContainer>
                                                                        <Upload color="#ffffff" />
                                                                    </ImageButtonContainer>
                                                                </UploadCoverImageButton>
                                                                {selectedPostCover ||
                                                                (data?.findPost
                                                                    ?.postCover !==
                                                                    "" &&
                                                                    data
                                                                        ?.findPost
                                                                        ?.postCover !==
                                                                        null) ? (
                                                                    <PageBlock>
                                                                        <ImageButtonContainer
                                                                            role="button"
                                                                            title="Remove image"
                                                                            aria-label="Remove image"
                                                                            onClick={() => {
                                                                                if (
                                                                                    uploadPostCoverRef &&
                                                                                    uploadPostCoverRef.current
                                                                                ) {
                                                                                    uploadPostCoverRef.current.value =
                                                                                        "";
                                                                                }
                                                                                if (
                                                                                    postCoverRef &&
                                                                                    postCoverRef.current
                                                                                ) {
                                                                                    postCoverRef.current.src =
                                                                                        postCover;
                                                                                }
                                                                                setSelectedPostCover(
                                                                                    null
                                                                                );
                                                                                setDeletePostCover(
                                                                                    true
                                                                                );
                                                                                setIsPostCoverUploaded(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Close
                                                                                type="normal"
                                                                                color="#ffffff"
                                                                            />
                                                                        </ImageButtonContainer>
                                                                    </PageBlock>
                                                                ) : null}
                                                            </CoverImageButtonsContainer>
                                                            <img
                                                                src={
                                                                    data
                                                                        ?.findPost
                                                                        ?.postCover !==
                                                                        "" &&
                                                                    data
                                                                        ?.findPost
                                                                        ?.postCover !==
                                                                        null
                                                                        ? data
                                                                              ?.findPost
                                                                              ?.postCover
                                                                        : postCover
                                                                }
                                                                ref={
                                                                    postCoverRef
                                                                }
                                                                title={`Post cover of post ${data?.findPost?.id}`}
                                                                alt={`Post cover of post ${data?.findPost?.id}`}
                                                            />
                                                        </CoverImageContainer>
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
                                                                                    backgroundLocation:
                                                                                        location,
                                                                                }}
                                                                            >
                                                                                Publish
                                                                                post
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
