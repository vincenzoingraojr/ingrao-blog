import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import styled from "styled-components";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import LoadingComponent from "../components/utils/LoadingComponent";
import { useEditPublishedPostMutation, useFindPostQuery, useUnpublishPostMutation } from "../generated/graphql";
import { devices } from "../styles/devices";
import { Button, ControlContainer, CoverImageButtonsContainer, CoverImageContainer, FlexContainer24, FlexRow24, ImageButtonContainer, LinkButton, LoadingContainer, PageBlock, PageText, PostFormContainer, Status, UploadCoverImageButton } from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";
import postCover from "../images/post-cover.svg";
import Upload from "../components/icons/Upload";
import Close from "../components/icons/Close";
import InputField from "../components/input/InputField";
import EditorField from "../components/input/content/EditorField";
import Arrow from "../components/icons/Arrow";
import axios from "axios";

const EditPostLayoutTitle = styled.div`
    display: block;
    font-weight: 700;
    margin-bottom: 48px;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

const EditPostButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

const UnpublishPostButton = styled(Button)`
    color: #ffffff;
    background-color: #000000;
`;

const EditPostHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    margin-bottom: 48px;
`;

const GoBackButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

const GoBackButtonText = styled(PageText)`
    font-weight: 700;
`;

const ViewPostButton = styled(LinkButton)`
    color: #ffffff;
    background-color: #000000;
`;
function EditPost() {
    const navigate = useNavigate();
    const params = useParams();
    const navigationType = useNavigationType();

    const { data, loading, error } = useFindPostQuery({
        fetchPolicy: "network-only",
        variables: { id: parseInt(params.id!) },
    });

    const [editPost] = useEditPublishedPostMutation();
    const [unpublishPost] = useUnpublishPostMutation();

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findPost && !data.findPost.draft) {
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
    
    return (
        <>
            <Head
                title="Edit a post | dashboard.ingrao.blog"
                description="In this page you can edit a published post."    
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <>
                                {(loading && !data) || error ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <>
                                        <EditPostHeader>
                                            <GoBackButton>
                                                <ControlContainer
                                                    title="Go back"
                                                    role="button"
                                                    aria-label="Go back"
                                                    onClick={() => {
                                                        if (navigationType === "POP") {
                                                            navigate("/");
                                                        } else {
                                                            navigate(-1);
                                                        }
                                                    }}
                                                >
                                                    <Arrow />
                                                </ControlContainer>
                                                <GoBackButtonText>
                                                    Go back
                                                </GoBackButtonText>
                                            </GoBackButton>
                                            <ViewPostButton
                                                to={`/post/${data?.findPost?.slug}`}
                                                title="View post"
                                            >
                                                View post
                                            </ViewPostButton>
                                        </EditPostHeader>
                                        <EditPostLayoutTitle>
                                            Edit this post
                                        </EditPostLayoutTitle>
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
                                                onSubmit={async (values, { setErrors, setStatus }) => {
                                                    let postCoverName = "";
                                                    let existingPostCoverName = "";
                                                    let directory = "";
                                        
                                                    if (
                                                        data?.findPost?.postCover !== "" &&
                                                        data?.findPost?.postCover !== null
                                                    ) {
                                                        existingPostCoverName = data?.findPost?.postCover?.replace(
                                                            `https://storage.ingrao.blog/${
                                                                process.env.REACT_APP_ENV === "development"
                                                                    ? "local-post"
                                                                    : "post"
                                                            }/${data?.findPost?.id}/`,
                                                            ""
                                                        )!;
                                                    }
                                        
                                                    if (selectedPostCover !== null) {
                                                        if (existingPostCoverName !== "") {
                                                            await axios.delete(
                                                                `https://storage-ingrao-blog.s3.eu-south-1.amazonaws.com/${
                                                                    process.env.REACT_APP_ENV === "development"
                                                                        ? "local-post"
                                                                        : "post"
                                                                }/${data?.findPost?.id}/${existingPostCoverName}`
                                                            );
                                                        }
                                        
                                                        postCoverName = `post-cover-${new Date().getTime()}.jpeg`;
                                                        directory =
                                                            process.env.REACT_APP_ENV === "development"
                                                                ? `local-post/${data?.findPost?.id}`
                                                                : `post/${data?.findPost?.id}`;
                                        
                                                        let key = `${directory}/${postCoverName}`;
                                        
                                                        const { url } = await fetch(
                                                            `${process.env.REACT_APP_SERVER_ORIGIN}/presigned-url`,
                                                            {
                                                                method: "POST",
                                                                headers: {
                                                                    Accept: "application/json",
                                                                    "Content-Type": "application/json",
                                                                },
                                                                body: JSON.stringify({
                                                                    key: key,
                                                                }),
                                                            }
                                                        ).then((res) => res.json());
                                        
                                                        setStatus("Uploading the post cover...");

                                                        const postCoverConfig = {
                                                            onUploadProgress: function(progressEvent: any) {
                                                                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                                                setStatus(`Uploading post cover: ${percentCompleted}%.`);
                                                            },
                                                            Headers: {
                                                                "Content-Type": "multipart/form-data",
                                                            },
                                                        };

                                                        await axios.put(url, selectedPostCover, postCoverConfig)
                                                            .then(() => {
                                                                setStatus("The post cover was uploaded successfully.");
                                                            }).catch((error) => {
                                                                setStatus(`An error occurred while uploading the post cover. Error code: ${error.code}.`);
                                                            });
                                                    } else if (
                                                        data?.findPost?.postCover !== "" &&
                                                        data?.findPost?.postCover !== null &&
                                                        deletePostCover
                                                    ) {
                                                        await axios.delete(
                                                            `https://storage-ingrao-blog.s3.eu-south-1.amazonaws.com/${
                                                                process.env.REACT_APP_ENV === "development"
                                                                    ? "local-post"
                                                                    : "post"
                                                            }/${data?.findPost?.id}/${existingPostCoverName}`
                                                        );
                                                    } else {
                                                        postCoverName = existingPostCoverName;
                                                    }
                                                    setSelectedPostCover(null);
                                        
                                                    const response = await editPost({
                                                        variables: {
                                                            postId: parseInt(params.id!),
                                                            slug: values.slug,
                                                            title: values.title,
                                                            description: values.description,
                                                            slogan: values.slogan,
                                                            content: values.content,
                                                            postCover:
                                                                (!isPostCoverUploaded &&
                                                                    !deletePostCover &&
                                                                    data?.findPost?.postCover !== "") ||
                                                                isPostCoverUploaded
                                                                    ? `https://storage.ingrao.blog/${
                                                                          process.env.REACT_APP_ENV === "development"
                                                                              ? "local-post"
                                                                              : "post"
                                                                      }/${data?.findPost?.id}/${postCoverName}`
                                                                    : "",
                                                        },
                                                    });
                                        
                                                    if (response.data?.editPublishedPost.status) {
                                                        setStatus(response.data.editPublishedPost.status);
                                                    } else if (
                                                        response.data?.editPublishedPost.errors?.length !== 0
                                                    ) {
                                                        setStatus(null);
                                                        setErrors(
                                                            toErrorMap(response.data?.editPublishedPost?.errors!)
                                                        );
                                                    }
                                                }}
                                            >
                                                {({
                                                    errors,
                                                    status,
                                                    values,
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
                                                                                if (
                                                                                    localPostCover !==
                                                                                    undefined
                                                                                ) {
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
                                                                title={`Cover of post ${data?.findPost?.id}`}
                                                                alt={`Cover of post ${data?.findPost?.id}`}
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
                                                                <PageBlock>
                                                                    <FlexRow24>
                                                                        <PageBlock>
                                                                            <EditPostButton
                                                                                type="submit"
                                                                                title="Save changes"
                                                                                role="button"
                                                                                aria-label="Save changes"
                                                                            >
                                                                                Save
                                                                                changes
                                                                            </EditPostButton>
                                                                        </PageBlock>
                                                                        <PageBlock>
                                                                            <UnpublishPostButton
                                                                                type="button"
                                                                                title="Unpublish post"
                                                                                role="button"
                                                                                aria-label="Unpublish post"
                                                                                onClick={() => {
                                                                                    unpublishPost({
                                                                                        variables: {
                                                                                            postId: parseInt(params.id!),
                                                                                        },
                                                                                    }).then(() => {
                                                                                        navigate(`/update-post/${parseInt(params.id!)}`);
                                                                                    });
                                                                                }}
                                                                            >
                                                                                Unpublish post
                                                                            </UnpublishPostButton>
                                                                        </PageBlock>
                                                                    </FlexRow24>
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

export default EditPost;
