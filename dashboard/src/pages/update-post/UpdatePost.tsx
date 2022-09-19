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
import aws from "aws-sdk";
import postCover from "../../images/post-cover.svg";

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

    const s3bucket = new aws.S3({
        accessKeyId: process.env.REACT_APP_STORAGE_KEY_ID,
        secretAccessKey: process.env.REACT_APP_STORAGE_SECRET_KEY,
        signatureVersion: "v4",
        region: "eu-south-1",
    });

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
                                            <CoverImageContainer>
                                                <CoverImageButtonsContainer>
                                                    <UploadCoverImageButton
                                                        role="button"
                                                        title="Upload your post cover image"
                                                        aria-label="Upload your profile banner"
                                                        onClick={() => {
                                                            if (uploadProfileBannerRef.current) {
                                                                uploadProfileBannerRef.current.click();
                                                            }
                                                        }}
                                                    >
                                                        <input
                                                            type="file"
                                                            name="profile-banner"
                                                            ref={uploadProfileBannerRef}
                                                            onChange={(event) => {
                                                                let localProfileBanner = null;
                                                                localProfileBanner =
                                                                    event.target.files![0];
                                                                setSelectedProfileBanner(
                                                                    localProfileBanner
                                                                );
                                                                setDeleteProfileBanner(false);
                                                                setIsProfileBannerUploaded(true);
                                                                if (
                                                                    profileBannerRef &&
                                                                    profileBannerRef.current
                                                                ) {
                                                                    profileBannerRef.current.src =
                                                                        URL.createObjectURL(
                                                                            localProfileBanner
                                                                        );
                                                                }
                                                            }}
                                                            accept="image/png , image/jpeg, image/webp"
                                                        />
                                                        <ImageButtonContainer>
                                                            <AddImage />
                                                        </ImageButtonContainer>
                                                    </UploadBannerImageButton>
                                                    {selectedProfileBanner ||
                                                    (data?.me?.profile?.profileBanner !== "" &&
                                                        data?.me?.profile?.profileBanner !==
                                                            null) ? (
                                                        <PageBlock>
                                                            <ImageButtonContainer
                                                                role="button"
                                                                title="Remove image"
                                                                aria-label="Remove image"
                                                                onClick={() => {
                                                                    if (
                                                                        uploadProfileBannerRef &&
                                                                        uploadProfileBannerRef.current
                                                                    ) {
                                                                        uploadProfileBannerRef.current.value =
                                                                            "";
                                                                    }
                                                                    if (
                                                                        profileBannerRef &&
                                                                        profileBannerRef.current
                                                                    ) {
                                                                        profileBannerRef.current.src =
                                                                            profileBanner;
                                                                    }
                                                                    setSelectedProfileBanner(null);
                                                                    setDeleteProfileBanner(true);
                                                                    setIsProfileBannerUploaded(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <Close type="small" />
                                                            </ImageButtonContainer>
                                                        </PageBlock>
                                                    ) : null}
                                                </CoverImageButtonsContainer>
                                                <img
                                                    src={
                                                        data?.me?.profile?.profileBanner !== "" &&
                                                        data?.me?.profile?.profileBanner !== null
                                                            ? data?.me?.profile?.profileBanner
                                                            : postCover
                                                    }
                                                    ref={postCoverRef}
                                                    title={`${data?.me?.firstName} ${data?.me?.lastName}'s profile banner.`}
                                                    alt={`${data?.me?.firstName} ${data?.me?.lastName}`}
                                                />
                                            </CoverImageContainer>
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
