import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../../../components/Head";
import FocusPageLayout from "../../../components/layouts/FocusPageLayout";
import LoadingComponent from "../../../components/utils/LoadingComponent";
import { useFindNewsletterByIdQuery } from "../../../generated/graphql";
import { LoadingContainer, PageBlock, PageText } from "../../../styles/global";
import UpdateIssueComponent from "./UpdateIssueComponent";
import newsletterCover from "../../../images/cover.svg";
import styled from "styled-components";
import { devices } from "../../../styles/devices";
import { processDate } from "../../../utils/processDate";
import { Editor } from "@ingrao-blog/editor";

const IssuePreviewImage = styled.div`
    display: block;

    img {
        width: 100%;
        height: auto;
    }
`;

const IssuePreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const IssuePreviewTitle = styled.div`
    display: block;
    font-family: "Source Serif Pro", serif;
    font-weight: 700;
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

const IssuePreviewSubject = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 4px solid #000000;
`;

const IssuePreviewInfo = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 16px;
    column-gap: 12px;
    row-gap: 4px;
`;

const IssuePreviewDate = styled.div`
    display: block;
    color: #c0c0c0;
`;

const IssuePreviewContent = styled.div`
    display: block;
    margin-left: 0px;
    margin-right: 0px;
    font-family: "Source Serif Pro", serif;

    @media ${devices.mobileL} {
        margin-left: 24px;
        margin-right: 24px;
    }

    @media ${devices.tablet} {
        margin-left: 10%;
        margin-right: 10%;
    }
`;

function IssuePreview() {
    const navigate = useNavigate();
    const params = useParams();

    const { data, loading, error } = useFindNewsletterByIdQuery({
        fetchPolicy: "network-only",
        variables: { newsletterId: params.newsletterId },
    });

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findNewsletterById && data.findNewsletterById.draft) {
                console.log("Issue found.");
            } else {
                navigate("/");
            }
        } else {
            console.log("Loading...");
        }
    }, [navigate, data, loading, error]);

    const [issueContent, setIssueContent] = useState<any | undefined>(
        undefined
    );
    const [contentReady, setContentReady] = useState(false);

    useEffect(() => {
        const content = data?.findNewsletterById?.content;

        if (content) {
            setContentReady(true);
            setIssueContent(JSON.parse(content));
        } else {
            setContentReady(false);
            setIssueContent(undefined);
        }
    }, [data?.findNewsletterById?.content]);

    return (
        <>
            <Head
                title={`${data?.findNewsletterById?.title} | Preview on dashboard.ingrao.blog`}
                description="In this page you can view the issue preview."
            />
            <FocusPageLayout
                title={`Update issue ${data?.findNewsletterById?.id}`}
                content={
                    <UpdateIssueComponent
                        newsletterId={params.newsletterId!}
                        content={
                            <>
                                {(loading && !data) || error ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <IssuePreviewContainer>
                                        <PageBlock>
                                            <IssuePreviewSubject>
                                                {data?.findNewsletterById?.subject !== ""
                                                    ? data?.findNewsletterById?.subject
                                                    : "Subject"}
                                            </IssuePreviewSubject>
                                        </PageBlock>
                                        <IssuePreviewTitle>
                                            {data?.findNewsletterById?.title}
                                        </IssuePreviewTitle>
                                        <IssuePreviewInfo>
                                            <PageBlock>
                                                By{" "}
                                                <strong>
                                                    {
                                                        data?.findNewsletterById?.author
                                                            .firstName
                                                    }{" "}
                                                    {
                                                        data?.findNewsletterById?.author
                                                            .lastName
                                                    }
                                                </strong>
                                            </PageBlock>
                                            <PageText>|</PageText>
                                            <IssuePreviewDate>
                                                {new Date(
                                                    parseInt(
                                                        data?.findNewsletterById
                                                            ?.updatedAt!
                                                    )
                                                ).toLocaleString("en-us", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                                , updated{" "}
                                                {processDate(
                                                    data?.findNewsletterById?.updatedAt!
                                                )}
                                            </IssuePreviewDate>
                                        </IssuePreviewInfo>
                                        <IssuePreviewImage>
                                            <img
                                                src={
                                                    data?.findNewsletterById
                                                        ?.newsletterCover !== "" &&
                                                    data?.findNewsletterById
                                                        ?.newsletterCover !== null
                                                        ? data?.findNewsletterById
                                                              ?.newsletterCover
                                                        : newsletterCover
                                                }
                                                title={`Cover of issue ${data?.findNewsletterById?.id}`}
                                                alt={`Cover of issue ${data?.findNewsletterById?.id}`}
                                            />
                                        </IssuePreviewImage>
                                        {contentReady && (
                                            <IssuePreviewContent>
                                                <Editor
                                                    readOnly={true}
                                                    toolbarHidden={true}
                                                    initialContentState={issueContent}
                                                />
                                            </IssuePreviewContent>
                                        )}
                                    </IssuePreviewContainer>
                                )}
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default IssuePreview;
