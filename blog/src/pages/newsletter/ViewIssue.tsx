import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { useFindNewsletterByIdQuery } from "../../generated/graphql";
import styled from "styled-components";
import { LoadingContainer, PageBlock, PageText } from "../../styles/global";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { devices } from "../../styles/devices";
import { Editor } from "@ingrao-blog/editor";

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
                title={`${data?.findNewsletterById?.title} | dashboard.ingrao.blog`}
                description={`In this page you can read "${data?.findNewsletterById?.title}", a newsletter issue by ${data?.findNewsletterById?.author.firstName} ${data?.findNewsletterById?.author.lastName}.`}
                blogPost={true}
                image={data?.findNewsletterById?.newsletterCover!}
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
                                    <IssueContainer>
                                        <PageBlock>
                                            <IssueSubject>
                                                {data?.findNewsletterById?.subject}
                                            </IssueSubject>
                                        </PageBlock>
                                        <IssueTitle>
                                            {data?.findNewsletterById?.title}
                                        </IssueTitle>
                                        <IssueInfo>
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
                                            <IssueDate>
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
                                            </IssueDate>
                                        </IssueInfo>
                                        <IssueCoverImage>
                                            <img
                                                src={
                                                    data?.findNewsletterById
                                                        ?.newsletterCover!
                                                }
                                                title={`Cover of newsletter issue ${data?.findNewsletterById?.id}: ${data?.findNewsletterById?.title}`}
                                                alt={`Cover of newsletter issue ${data?.findNewsletterById?.id}: ${data?.findNewsletterById?.title}`}
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
