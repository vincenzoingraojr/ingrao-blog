import { useEffect, useState } from "react";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { useDashNewsletterFeedQuery, useDraftNewsletterFeedQuery, useMeQuery, useNewsletterPersonalFeedQuery } from "../../generated/graphql";
import { LoadingContainer, OptionContainer, OptionTitle, PageBlock, PageText, PageTextMB48 } from "../../styles/global";
import SettingsComponent from "./NewsletterComponent";
import styled from "styled-components";
import SearchBoxComponent from "../../components/utils/SearchBox";
import SmallIssueComponent from "../../components/layouts/items/SmallIssueComponent";
import ErrorComponent from "../../components/utils/ErrorComponent";

const IssuesPageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const IssueFeed = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

function IssuesPage() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "cache-and-network",
        variables: { origin: "dash" },
    });

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (data && data.me && data.me.role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [data]);

    const { data: dashNewsletterData, loading: dashNewsletterLoading, error: dashNewsletterError } = useDashNewsletterFeedQuery({ fetchPolicy: "cache-and-network" });

    const { data: newsletterData, loading: newsletterLoading, error: newsletterError } = useNewsletterPersonalFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data: draftNewsletterData, loading: draftNewsletterLoading, error: draftNewsletterError } = useDraftNewsletterFeedQuery({ fetchPolicy: "cache-and-network" });

    return (
        <>
            <Head 
                title={`${isAdmin ? `All issues` : `Your issues`} | dashboard.ingrao.blog`}
                description="In this page you can manage the ingrao.blog newsletter issues."
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <SettingsComponent
                                isAdmin={isAdmin}
                                content={
                                    <>
                                        {(loading || dashNewsletterLoading) ? (
                                            <LoadingContainer>
                                                <LoadingComponent />
                                            </LoadingContainer>
                                        ) : (
                                            <>
                                                {(data && data.me && data.me.posts && dashNewsletterData && !error && !dashNewsletterError) ? (
                                                    <>
                                                        <SidebarLayoutTitle>
                                                            {isAdmin ? <>All issues</> : <>Your issues</>}
                                                        </SidebarLayoutTitle>
                                                        {isAdmin ? (
                                                            <> 
                                                                <PageTextMB48>
                                                                    In this page you can manage all the posts.
                                                                </PageTextMB48>
                                                                <SearchBoxComponent data={dashNewsletterData.dashNewsletterFeed} type="newsletter" />  
                                                            </>
                                                        ) : (
                                                            <IssuesPageContent>
                                                                <PageText>
                                                                    You've been working on {data.me.posts.length}{" "}{data.me.posts.length === 1 ? "newsletter issue" : "newsletter issues"}. 
                                                                </PageText>
                                                                <OptionContainer>
                                                                    <OptionTitle>
                                                                        Your published newsletter issues
                                                                    </OptionTitle>
                                                                    <PageText>
                                                                        Here you can view your published posts.
                                                                    </PageText>
                                                                    <PageBlock>
                                                                        {newsletterLoading ? (
                                                                            <LoadingContainer>
                                                                                <LoadingComponent />
                                                                            </LoadingContainer>
                                                                        ) : (
                                                                            <>
                                                                                {newsletterData && newsletterData.newsletterPersonalFeed && !newsletterError ? (
                                                                                    <>
                                                                                        {newsletterData?.newsletterPersonalFeed?.length ===
                                                                                        0 ? (
                                                                                            <PageText>
                                                                                                There are no published newsletter issues.
                                                                                            </PageText>
                                                                                        ) : (
                                                                                            <IssueFeed>
                                                                                                {newsletterData.newsletterPersonalFeed.map(
                                                                                                    (issue) => (
                                                                                                        <SmallIssueComponent
                                                                                                            key={
                                                                                                                issue.id
                                                                                                            }
                                                                                                            issue={issue}
                                                                                                        />
                                                                                                    )
                                                                                                )}
                                                                                            </IssueFeed>
                                                                                        )}
                                                                                    </>
                                                                                ) : (
                                                                                    <ErrorComponent />
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </PageBlock>
                                                                </OptionContainer>
                                                                <OptionContainer>
                                                                    <OptionTitle>
                                                                        Your drafts
                                                                    </OptionTitle>
                                                                    <PageText>
                                                                        Here you can view your unpublished newsletter issues.
                                                                    </PageText>
                                                                    <PageBlock>
                                                                        {draftNewsletterLoading ? (
                                                                            <LoadingContainer>
                                                                                <LoadingComponent />
                                                                            </LoadingContainer>
                                                                        ) : (
                                                                            <>
                                                                                {draftNewsletterData && draftNewsletterData.draftNewsletterFeed && !draftNewsletterError ? (
                                                                                    <>
                                                                                        {draftNewsletterData?.draftNewsletterFeed?.length ===
                                                                                        0 ? (
                                                                                            <PageText>
                                                                                                There are no unpublished newsletter issues.
                                                                                            </PageText>
                                                                                        ) : (
                                                                                            <IssueFeed>
                                                                                                {draftNewsletterData?.draftNewsletterFeed?.map(
                                                                                                    (draftIssue) => (
                                                                                                        <SmallIssueComponent
                                                                                                            key={
                                                                                                                draftIssue.id
                                                                                                            }
                                                                                                            issue={draftIssue}
                                                                                                        />
                                                                                                    )
                                                                                                )}
                                                                                            </IssueFeed>
                                                                                        )}
                                                                                    </>
                                                                                ) : (
                                                                                    <ErrorComponent />
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </PageBlock>
                                                                </OptionContainer>
                                                            </IssuesPageContent>
                                                        )}
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
                }
            />
        </>
    );
}

export default IssuesPage;