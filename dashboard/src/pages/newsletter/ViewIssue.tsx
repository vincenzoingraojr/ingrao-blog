import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { useFindNewsletterByIdQuery } from "../../generated/graphql";
import styled from "styled-components";
import { ControlContainer, LoadingContainer, PageBlock, PageText, LinkButton } from "../../styles/global";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { devices } from "../../styles/devices";
import Arrow from "../../components/icons/Arrow";
import { Editor } from "@ingrao-blog/editor";
import { processDate } from "../../utils/processDate";
import ErrorComponent from "../../components/utils/ErrorComponent";

const IssueCoverImage = styled.div`
    display: block;

    img {
        width: 100%;
        height: auto;
    }
`;

const IssueContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const IssueTitle = styled.div`
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

const IssueSubject = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 4px solid #000000;
`;

const IssueInfo = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 16px;
    column-gap: 12px;
    row-gap: 4px;
`;

const IssueDate = styled.div`
    display: block;
    color: #c0c0c0;
`;

const IssueContent = styled.div`
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

const IssueHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
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

const EditIssueButton = styled(LinkButton)`
    color: #ffffff;
    background-color: #000000;
`;

function ViewIssue() {
    const navigate = useNavigate();
    const params = useParams();

    const { data, loading, error } = useFindNewsletterByIdQuery({
        fetchPolicy: "network-only",
        variables: { newsletterId: params.newsletterId! },
    });

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

    const [issueContent, setIssueContent] = useState<any | undefined>(
        undefined
    );
    const [contentReady, setContentReady] = useState(false);

    useEffect(() => {
        if (data && data.findNewsletterById) {
            const content = data.findNewsletterById.content;

            if (content) {
                setContentReady(true);
                setIssueContent(JSON.parse(content));
            } else {
                setContentReady(false);
                setIssueContent(undefined);
            }
        }
    }, [data]);

    const [date, setDate] = useState("");

    useEffect(() => {
        if (data && data.findNewsletterById) {
            const publishDate = new Date(parseInt(data.findNewsletterById.createdAt)).toLocaleString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            if (data.findNewsletterById.isEdited) {
                const updatedIssueDate = processDate(data.findNewsletterById.updatedAt);
                setDate(`Published on ${publishDate}, updated ${updatedIssueDate}`);
            } else {
                setDate(publishDate);
            }
        }
    }, [data]);
    
    return (
        <>
            <Head
                title={loading ? ("Loading... | dashboard.ingrao.blog") : ((data && data.findNewsletterById) ? `${data.findNewsletterById.title} | dashboard.ingrao.blog` : "No data")}
                description={loading ? ("Loading...") : ((data && data.findNewsletterById) ? `${data.findNewsletterById.subject}. Written by ${data.findNewsletterById.author.firstName} ${data.findNewsletterById.author.lastName}` : "No data")}
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
                                            <IssueContainer>
                                                <IssueHeader>
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
                                                    <EditIssueButton
                                                        to={`/newsletter/edit-issue/${data.findNewsletterById.newsletterId}`}
                                                        title="Edit issue"
                                                    >
                                                        Edit issue
                                                    </EditIssueButton>
                                                </IssueHeader>
                                                <PageBlock>
                                                    <IssueSubject>
                                                        {data.findNewsletterById.subject}
                                                    </IssueSubject>
                                                </PageBlock>
                                                <IssueTitle>
                                                    {data.findNewsletterById.title}
                                                </IssueTitle>
                                                <IssueInfo>
                                                    <PageBlock>
                                                        By{" "}
                                                        <strong>
                                                            {
                                                                data.findNewsletterById.author
                                                                    .firstName
                                                            }{" "}
                                                            {
                                                                data.findNewsletterById.author
                                                                    .lastName
                                                            }
                                                        </strong>
                                                    </PageBlock>
                                                    <PageText>|</PageText>
                                                    <IssueDate>
                                                        {date}
                                                    </IssueDate>
                                                </IssueInfo>
                                                <IssueCoverImage>
                                                    <img
                                                        src={
                                                            data.findNewsletterById
                                                                .newsletterCover as string
                                                        }
                                                        title={`Cover of newsletter issue ${data.findNewsletterById.id}: ${data.findNewsletterById.title}`}
                                                        alt={`Cover of newsletter issue ${data.findNewsletterById.id}: ${data.findNewsletterById.title}`}
                                                    />
                                                </IssueCoverImage>
                                                {contentReady && (
                                                    <IssueContent>
                                                        <Editor
                                                            readOnly={true}
                                                            toolbarHidden={true}
                                                            initialContentState={issueContent}
                                                        />
                                                    </IssueContent>
                                                )}
                                            </IssueContainer>
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

export default ViewIssue;
