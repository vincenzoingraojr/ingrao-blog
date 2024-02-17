import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { useEditPublishedIssueMutation, useFindNewsletterByIdQuery, useUnpublishIssueMutation } from "../../generated/graphql";
import { devices } from "../../styles/devices";
import { Button, ControlContainer, CoverImageButtonsContainer, CoverImageContainer, FlexContainer24, FlexRow24, ImageButtonContainer, LinkButton, LoadingContainer, PageBlock, PageText, PostFormContainer, Status, UploadCoverImageButton } from "../../styles/global";
import { toErrorMap } from "../../utils/toErrorMap";
import newsletterCover from "../../images/cover.svg";
import Upload from "../../components/icons/Upload";
import Close from "../../components/icons/Close";
import InputField from "../../components/input/InputField";
import EditorField from "../../components/input/content/EditorField";
import Arrow from "../../components/icons/Arrow";
import axios from "axios";
import ErrorComponent from "../../components/utils/ErrorComponent";

const EditIssueLayoutTitle = styled.div`
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

const EditIssueButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

const UnpublishIssueButton = styled(Button)`
    color: #ffffff;
    background-color: #000000;
`;

const EditIssueHeader = styled.div`
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

const ViewIssueButton = styled(LinkButton)`
    color: #ffffff;
    background-color: #000000;
`;

function EditIssue() {
    const navigate = useNavigate();
    const params = useParams();

    const { data, loading, error } = useFindNewsletterByIdQuery({
        fetchPolicy: "network-only",
        variables: { newsletterId: params.newsletterId },
    });

    const [editIssue] = useEditPublishedIssueMutation();
    const [unpublishIssue] = useUnpublishIssueMutation();

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findNewsletterById && !data.findNewsletterById.draft) {
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
    
    return (
        <>
            <Head
                title="Edit a newsletter issue | dashboard.ingrao.blog"
                description="In this page you can edit a published newsletter issue."    
            />
            <PageLayout
                content={
                    <PageContentLayout
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
                                                <EditIssueHeader>
                                                    <GoBackButton>
                                                        <ControlContainer
                                                            title="Go back"
                                                            role="button"
                                                            aria-label="Go back"
                                                            onClick={() => {
                                                                if (window.history.length > 2) {
                                                                    navigate(-1);
                                                                } else {
                                                                    navigate("/");
                                                                }
                                                            }}
                                                        >
                                                            <Arrow />
                                                        </ControlContainer>
                                                        <GoBackButtonText>
                                                            Go back
                                                        </GoBackButtonText>
                                                    </GoBackButton>
                                                    <ViewIssueButton
                                                        to={`/newsletter/issue/${data.findNewsletterById.newsletterId}`}
                                                        title="View issue"
                                                    >
                                                        View issue
                                                    </ViewIssueButton>
                                                </EditIssueHeader>
                                                <EditIssueLayoutTitle>
                                                    Edit this newsletter issue
                                                </EditIssueLayoutTitle>
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
                                                        onSubmit={async (values, { setErrors, setStatus }) => {
                                                            let issueCoverName = "";
                                                            let existingIssueCoverName = "";
                                                            let directory = "";
                                                
                                                            if (
                                                                data && data.findNewsletterById && data.findNewsletterById.newsletterCover &&
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
                                                                if (data && data.findNewsletterById && existingIssueCoverName !== "") {
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
                                                                            ? `local-issues/${data.findNewsletterById.newsletterId}`
                                                                            : `issues/${data.findNewsletterById.newsletterId}`;
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
                                                
                                                            const response = await editIssue({
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
                                                                if (response.data.editPublishedIssue.status && response.data.editPublishedIssue.status.length > 2) {
                                                                    setStatus(response.data.editPublishedIssue.status);
                                                                } else if (
                                                                    response.data.editPublishedIssue.errors && response.data.editPublishedIssue.errors.length > 0
                                                                ) {
                                                                    setStatus(null);
                                                                    setErrors(
                                                                        toErrorMap(response.data.editPublishedIssue.errors)
                                                                    );
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {({
                                                            errors,
                                                            status,
                                                            values,
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
                                                                                            title="Upload your newsletter issue cover image"
                                                                                            aria-label="Upload your newsletter issue cover image"
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
                                                                                        title={`Cover of newsletter issue ${data.findNewsletterById.id}`}
                                                                                        alt={`Cover of newsletter issue ${data.findNewsletterById.id}`}
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
                                                                                        <PageBlock>
                                                                                            <FlexRow24>
                                                                                                <PageBlock>
                                                                                                    <EditIssueButton
                                                                                                        type="submit"
                                                                                                        title="Save changes"
                                                                                                        role="button"
                                                                                                        aria-label="Save changes"
                                                                                                    >
                                                                                                        Save
                                                                                                        changes
                                                                                                    </EditIssueButton>
                                                                                                </PageBlock>
                                                                                                <PageBlock>
                                                                                                    <UnpublishIssueButton
                                                                                                        type="button"
                                                                                                        title="Unpublish issue"
                                                                                                        role="button"
                                                                                                        aria-label="Unpublish issue"
                                                                                                        onClick={() => {
                                                                                                            if (data.findNewsletterById) {
                                                                                                                unpublishIssue({
                                                                                                                    variables: {
                                                                                                                        id: data.findNewsletterById.id,
                                                                                                                    },
                                                                                                                }).then(() => {
                                                                                                                    navigate(`/newsletter/update-issue/${params.newsletterId}`);
                                                                                                                });
                                                                                                            }
                                                                                                        }}
                                                                                                    >
                                                                                                        Unpublish issue
                                                                                                    </UnpublishIssueButton>
                                                                                                </PageBlock>
                                                                                            </FlexRow24>
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

export default EditIssue;
