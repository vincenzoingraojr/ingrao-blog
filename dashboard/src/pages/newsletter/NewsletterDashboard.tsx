import { useEffect, useState } from "react";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { useDashNewsletterFeedQuery, useDraftNewsletterFeedQuery, useMeQuery, useNewsletterPersonalFeedQuery } from "../../generated/graphql";
import { DashStatsContainer, DataContainer, DataTypeContainer, LinkButton, LinkButtonText, LoadingContainer, OptionContainer, OptionsContainer, OptionTitle, PageBlock, PageText, PageTextMB48, StatsContainer } from "../../styles/global";
import SettingsComponent from "./NewsletterComponent";
import styled from "styled-components";
import Add from "../../components/icons/Add";
import { Outlet, useLocation } from "react-router-dom";
import { devices } from "../../styles/devices";
import NewsletterIssueComponent from "../../components/layouts/items/NewsletterIssueComponent";

const CreateNewIssueButton = styled(LinkButton)`
    color: #ffffff;
    background-color: blue;
`;

const IssueGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;

    @media (min-width: 560px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media ${devices.laptopS} {
        grid-template-columns: repeat(3, 1fr);
    }
`;

function NewsletterDashboard() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "cache-and-network",
        variables: { origin: "dash" },
    });

    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (data && data.me && data.me.role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [data]);

    const { data: newsletterData, loading: newsletterLoading, error: newsletterError } = useDraftNewsletterFeedQuery({
        fetchPolicy: "cache-and-network",
    });

    const { data: dashNewsletterData } = useDashNewsletterFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data: newsletterPersonalData } = useNewsletterPersonalFeedQuery({ fetchPolicy: "cache-and-network" });

    return (
        <>
            <Head 
                title="Newsletter | dashboard.ingrao.blog"
                description="In this page you can manage the ingrao.blog newsletter."
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <SettingsComponent
                                isAdmin={isAdmin}
                                content={
                                    <>
                                        {(loading && !data) || error ? (
                                            <LoadingContainer>
                                                <LoadingComponent />
                                            </LoadingContainer>
                                        ) : (
                                            <>
                                                <SidebarLayoutTitle>
                                                    Newsletter dashboard
                                                </SidebarLayoutTitle>
                                                <PageTextMB48>
                                                    In this page you can manage the newsletter.
                                                </PageTextMB48>
                                                <PageTextMB48>
                                                    <DashStatsContainer>
                                                        <StatsContainer>
                                                            <DataContainer>{dashNewsletterData?.dashNewsletterFeed.length}</DataContainer>
                                                            <DataTypeContainer>Total number of newsletter issues</DataTypeContainer>
                                                        </StatsContainer>
                                                        <StatsContainer>
                                                            <DataContainer>{newsletterPersonalData?.newsletterPersonalFeed.length}</DataContainer>
                                                            <DataTypeContainer>Number of your public issues</DataTypeContainer>
                                                        </StatsContainer>
                                                        <StatsContainer>
                                                            <DataContainer>{newsletterData?.draftNewsletterFeed.length}</DataContainer>
                                                            <DataTypeContainer>Number of your drafts</DataTypeContainer>
                                                        </StatsContainer>
                                                    </DashStatsContainer>
                                                </PageTextMB48>
                                                <OptionsContainer>
                                                    <OptionContainer>
                                                        <OptionTitle>Create a new issue</OptionTitle>
                                                        <PageText>
                                                            Click on the following button to create
                                                            a new issue.
                                                        </PageText>
                                                        <PageBlock>
                                                            <CreateNewIssueButton
                                                                to="/newsletter/new-issue"
                                                                state={{
                                                                    backgroundLocation: location,
                                                                }}
                                                            >
                                                                <Add color={"#ffffff"} />
                                                                <LinkButtonText>
                                                                    Create issue
                                                                </LinkButtonText>
                                                            </CreateNewIssueButton>
                                                            <Outlet />
                                                        </PageBlock>
                                                    </OptionContainer>
                                                    <OptionContainer>
                                                        <OptionTitle>
                                                            Edit unpublished issue
                                                        </OptionTitle>
                                                        <PageText>
                                                            Here you can edit the unpublished newsletter issues.
                                                        </PageText>
                                                        <PageBlock>
                                                            {(newsletterLoading && !newsletterData) || newsletterError ? (
                                                                <LoadingContainer>
                                                                    <LoadingComponent />
                                                                </LoadingContainer>
                                                            ) : (
                                                                <>
                                                                    {newsletterData?.draftNewsletterFeed?.length ===
                                                                    0 ? (
                                                                        <PageText>
                                                                            No issues need to be
                                                                            updated or published.
                                                                        </PageText>
                                                                    ) : (
                                                                        <IssueGrid>
                                                                            {newsletterData?.draftNewsletterFeed?.map(
                                                                                (issue) => (
                                                                                    <NewsletterIssueComponent
                                                                                        key={
                                                                                            issue.id
                                                                                        }
                                                                                        issue={issue}
                                                                                    />
                                                                                )
                                                                            )}
                                                                        </IssueGrid>
                                                                    )}
                                                                </>
                                                            )}
                                                        </PageBlock>
                                                    </OptionContainer>
                                                </OptionsContainer>
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

export default NewsletterDashboard;