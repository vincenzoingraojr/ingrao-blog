import { Form, Formik } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Head from "../../../components/Head";
import InputField from "../../../components/input/InputField";
import FocusPageLayout from "../../../components/layouts/FocusPageLayout";
import { TabLayoutTitle } from "../../../components/layouts/sublayouts/TabLayout";
import LoadingComponent from "../../../components/utils/LoadingComponent";
import {
    useEditUnpublishedIssueMutation,
    useFindNewsletterByIdQuery,
} from "../../../generated/graphql";
import {
    Button,
    CoverImageButtonsContainer,
    CoverImageContainer,
    FlexContainer24,
    FlexRow24,
    ImageButtonContainer,
    LinkButton,
    LoadingContainer,
    PageBlock,
    PostFormContainer,
    Status,
    UploadCoverImageButton,
} from "../../../styles/global";
import { toErrorMap } from "../../../utils/toErrorMap";
import UpdateIssueComponent from "./UpdateIssueComponent";
import styled from "styled-components";
import EditorField from "../../../components/input/content/EditorField";
import { debounceAsync } from "../../../utils/debounceAsync";
import AutoSave from "../../../components/input/content/AutoSave";
import newsletterCover from "../../../images/cover.svg";
import Close from "../../../components/icons/Close";
import Upload from "../../../components/icons/Upload";
import axios from "axios";
import ErrorComponent from "../../../components/utils/ErrorComponent";

const UpdateIssueButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

const PublishIssueButton = styled(LinkButton)`
    color: #ffffff;
    background-color: #000000;
`;

function UpdateIssue() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { data, loading, error } = useFindNewsletterByIdQuery({
        fetchPolicy: "network-only",
        variables: { newsletterId: params.newsletterId },
    });

    const [updateIssue] = useEditUnpublishedIssueMutation();

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findNewsletterById && data.findNewsletterById.draft) {
                console.log("Newsletter issue found.");
            } else {
                navigate("/");
            }
        } else {
            console.log("Loading...");
        }
    }, [navigate, data, loading, error]);

    const [selectedIssueCover, setSelectedIssueCover] = useState<File | null>(
        null
    );

    const uploadIssueCoverRef = useRef<HTMLInputElement>(null);
    const issueCoverRef = useRef<HTMLImageElement>(null);
    const [deleteIssueCover, setDeleteIssueCover] = useState<boolean>(false);

    const [isIssueCoverUploaded, setIsIssueCoverUploaded] =
        useState<boolean>(false);

    const submitIssue = useCallback(
        async (values: any, { setErrors, setStatus }: any) => {
            let issueCoverName = "";
            let existingIssueCoverName = "";
            let directory = "";

            if (
                data && data.findNewsletterById &&
                data.findNewsletterById.newsletterCover &&
                data.findNewsletterById.newsletterCover !== "" &&
                data.findNewsletterById.newsletterCover !== null
            ) {
                existingIssueCoverName = data.findNewsletterById.newsletterCover.replace(
                    `https://storage.ingrao.blog/${
                        process.env.REACT_APP_ENV === "development"
                            ? "local-issues"
                            : "issues"
                    }/${data.findNewsletterById.newsletterId}/`,
                    ""
                )!;
            }

            if (selectedIssueCover !== null) {
                if (existingIssueCoverName !== "" && data && data.findNewsletterById) {
                    await axios.delete(
                        `${process.env.REACT_APP_STORAGE_LINK}/${
                            process.env.REACT_APP_ENV === "development"
                                ? "local-issues"
                                : "issues"
                        }/${data.findNewsletterById.newsletterId}/${existingIssueCoverName}`
                    );
                }

                issueCoverName = `issue-cover-${new Date().getTime()}.jpeg`;
                if (data && data.findNewsletterById) {
                    directory =
                        process.env.REACT_APP_ENV === "development"
                            ? `local-issues/${data?.findNewsletterById?.newsletterId}`
                            : `issues/${data?.findNewsletterById?.newsletterId}`;
                }

                let key = `${directory}/${issueCoverName}`;

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

                setStatus("Uploading the newsletter issue cover...");

                const issueCoverConfig = {
                    onUploadProgress: function(progressEvent: any) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setStatus(`Uploading newsletter issue cover: ${percentCompleted}%.`);
                    },
                    headers: {
                        "Content-Type": "image/jpeg",
                    },
                };

                await axios.put(url, selectedIssueCover, issueCoverConfig)
                    .then(() => {
                        setStatus("The newsletter issue cover was uploaded successfully.");
                    }).catch((error) => {
                        setStatus(`An error occurred while uploading the newsletter issue cover. Error code: ${error.code}.`);
                    });
            } else if (
                data?.findNewsletterById?.newsletterCover !== "" &&
                data?.findNewsletterById?.newsletterCover !== null &&
                deleteIssueCover
            ) {
                await axios.delete(
                    `${process.env.REACT_APP_STORAGE_LINK}/${
                        process.env.REACT_APP_ENV === "development"
                            ? "local-issues"
                            : "issues"
                    }/${data?.findNewsletterById?.newsletterId}/${existingIssueCoverName}`
                );
            } else {
                issueCoverName = existingIssueCoverName;
            }
            setSelectedIssueCover(null);

            const response = await updateIssue({
                variables: {
                    newsletterId: params.newsletterId!,
                    title: values.title,
                    subject: values.subject,
                    content: values.content,
                    newsletterCover:
                        (!isIssueCoverUploaded &&
                            !deleteIssueCover &&
                            data?.findNewsletterById?.newsletterCover !== "") ||
                        isIssueCoverUploaded
                            ? `https://storage.ingrao.blog/${
                                  process.env.REACT_APP_ENV === "development"
                                      ? "local-issues"
                                      : "issues"
                              }/${data?.findNewsletterById?.newsletterId}/${issueCoverName}`
                            : "",
                },
            });

            if (response.data) {
                if (response.data.editUnpublishedIssue.status && response.data.editUnpublishedIssue.status.length > 0) {
                    setStatus(response.data.editUnpublishedIssue.status);
                } else if (
                    response.data.editUnpublishedIssue.errors && response.data.editUnpublishedIssue.errors.length > 0
                ) {
                    setStatus(null);
                    setErrors(
                        toErrorMap(response.data.editUnpublishedIssue.errors)
                    );
                }
            }
        },
        [
            updateIssue,
            selectedIssueCover,
            data,
            isIssueCoverUploaded,
            deleteIssueCover,
        ]
    );

    const onSubmitDebounced = useMemo(() => {
        return debounceAsync(submitIssue, 400);
    }, [submitIssue]);

    return (
        <>
            <Head
                title="Update a newsletter issue | dashboard.ingrao.blog"
                description="In this page you can update a newsletter issue."
            />
            <FocusPageLayout
                title={loading ? "Loading..." : ((data && data.findNewsletterById) ? `${data.findNewsletterById.title}` : "No data")}
                content={
                    <UpdateIssueComponent
                        newsletterId={params.newsletterId!}
                        content={
                            <>
                                {loading ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <>
                                        {data && data.findNewsletterById && !error ? (
                                            <>
                                                <TabLayoutTitle>
                                                    Update newsletter issue {data.findNewsletterById.id}
                                                </TabLayoutTitle>
                                                <PostFormContainer>
                                                    <Formik
                                                        initialValues={{
                                                            newsletterId: params.newsletterId as string,
                                                            title: data.findNewsletterById
                                                                .title,
                                                            subject:
                                                                data.findNewsletterById
                                                                    .subject,
                                                            newsletterCover:
                                                                data.findNewsletterById
                                                                    .newsletterCover,
                                                            content:
                                                                data.findNewsletterById.content,
                                                        }}
                                                        onSubmit={onSubmitDebounced}
                                                    >
                                                        {({
                                                            errors,
                                                            status,
                                                            values,
                                                            submitForm,
                                                        }) => (
                                                            <>
                                                                {loading ? (
                                                                    <LoadingComponent />
                                                                ) : (
                                                                    <>
                                                                        {data && data.findNewsletterById && !error ? (
                                                                            <Form>
                                                                                <CoverImageContainer>
                                                                                    <CoverImageButtonsContainer>
                                                                                        <UploadCoverImageButton
                                                                                            role="button"
                                                                                            title="Upload your issue cover image"
                                                                                            aria-label="Upload your issue cover image"
                                                                                            onClick={() => {
                                                                                                if (
                                                                                                    uploadIssueCoverRef.current
                                                                                                ) {
                                                                                                    uploadIssueCoverRef.current.click();
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <input
                                                                                                type="file"
                                                                                                name="issue-cover"
                                                                                                ref={
                                                                                                    uploadIssueCoverRef
                                                                                                }
                                                                                                onChange={(
                                                                                                    event
                                                                                                ) => {
                                                                                                    let localIssueCover =
                                                                                                        null;
                                                                                                    localIssueCover =
                                                                                                        event
                                                                                                            .target
                                                                                                            .files![0];
                                                                                                    setSelectedIssueCover(
                                                                                                        localIssueCover
                                                                                                    );
                                                                                                    setDeleteIssueCover(
                                                                                                        false
                                                                                                    );
                                                                                                    setIsIssueCoverUploaded(
                                                                                                        true
                                                                                                    );
                                                                                                    if (
                                                                                                        issueCoverRef &&
                                                                                                        issueCoverRef.current
                                                                                                    ) {
                                                                                                        if (
                                                                                                            localIssueCover !==
                                                                                                            undefined
                                                                                                        ) {
                                                                                                            issueCoverRef.current.src =
                                                                                                                URL.createObjectURL(
                                                                                                                    localIssueCover
                                                                                                                );
                                                                                                        } else {
                                                                                                            issueCoverRef.current.src =
                                                                                                                newsletterCover;
                                                                                                        }
                                                                                                    }
                                                                                                }}
                                                                                                accept="image/png , image/jpeg, image/webp"
                                                                                            />
                                                                                            <ImageButtonContainer>
                                                                                                <Upload color="#ffffff" />
                                                                                            </ImageButtonContainer>
                                                                                        </UploadCoverImageButton>
                                                                                        {selectedIssueCover ||
                                                                                        (data.findNewsletterById
                                                                                            .newsletterCover !==
                                                                                            "" &&
                                                                                            data
                                                                                                .findNewsletterById
                                                                                                .newsletterCover !==
                                                                                                null) ? (
                                                                                            <PageBlock>
                                                                                                <ImageButtonContainer
                                                                                                    role="button"
                                                                                                    title="Remove image"
                                                                                                    aria-label="Remove image"
                                                                                                    onClick={() => {
                                                                                                        if (
                                                                                                            uploadIssueCoverRef &&
                                                                                                            uploadIssueCoverRef.current
                                                                                                        ) {
                                                                                                            uploadIssueCoverRef.current.value =
                                                                                                                "";
                                                                                                        }
                                                                                                        if (
                                                                                                            issueCoverRef &&
                                                                                                            issueCoverRef.current
                                                                                                        ) {
                                                                                                            issueCoverRef.current.src =
                                                                                                                newsletterCover;
                                                                                                        }
                                                                                                        setSelectedIssueCover(
                                                                                                            null
                                                                                                        );
                                                                                                        setDeleteIssueCover(
                                                                                                            true
                                                                                                        );
                                                                                                        setIsIssueCoverUploaded(
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
                                                                                                .findNewsletterById
                                                                                                .newsletterCover !==
                                                                                                "" &&
                                                                                            data
                                                                                                .findNewsletterById
                                                                                                .newsletterCover !==
                                                                                                null
                                                                                                ? data
                                                                                                    .findNewsletterById
                                                                                                    .newsletterCover
                                                                                                : newsletterCover
                                                                                        }
                                                                                        ref={
                                                                                            issueCoverRef
                                                                                        }
                                                                                        title={`Cover of issue ${data.findNewsletterById.id}`}
                                                                                        alt={`Cover of issue ${data.findNewsletterById.id}`}
                                                                                    />
                                                                                </CoverImageContainer>
                                                                                <PageBlock>
                                                                                    {status && (
                                                                                        <Status>
                                                                                            {status}
                                                                                        </Status>
                                                                                    )}
                                                                                    <FlexContainer24>
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
                                                                                            field="subject"
                                                                                            type="text"
                                                                                            placeholder="Subject"
                                                                                            value={
                                                                                                values.subject ||
                                                                                                ""
                                                                                            }
                                                                                            errors={
                                                                                                errors
                                                                                            }
                                                                                        />
                                                                                        <EditorField
                                                                                            field="content"
                                                                                            itemId={data.findNewsletterById.id}
                                                                                            newsletter={true}
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
                                                                                                    <UpdateIssueButton
                                                                                                        type="submit"
                                                                                                        title="Save changes"
                                                                                                        role="button"
                                                                                                        aria-label="Save changes"
                                                                                                    >
                                                                                                        Save
                                                                                                        changes
                                                                                                    </UpdateIssueButton>
                                                                                                </PageBlock>
                                                                                                <PageBlock>
                                                                                                    <PublishIssueButton
                                                                                                        to={`/newsletter/publish-issue/${params.newsletterId}`}
                                                                                                        title="Publish issue"
                                                                                                        state={{
                                                                                                            backgroundLocation:
                                                                                                                location,
                                                                                                        }}
                                                                                                    >
                                                                                                        Publish
                                                                                                        issue
                                                                                                    </PublishIssueButton>
                                                                                                </PageBlock>
                                                                                            </FlexRow24>
                                                                                            <Outlet />
                                                                                        </PageBlock>
                                                                                    </FlexContainer24>
                                                                                </PageBlock>
                                                                            </Form>
                                                                        ) : (
                                                                            <ErrorComponent />
                                                                        )}
                                                                    </>     
                                                                )}
                                                            </>
                                                        )}
                                                    </Formik>
                                                </PostFormContainer>
                                            </>
                                        ) : (
                                            <ErrorComponent />
                                        )}
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

export default UpdateIssue;
