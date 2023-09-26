import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import styled from "styled-components";
import { DashStatsContainer, DataContainer, DataTypeContainer, LoadingContainer, OptionContainer, OptionTitle, PageBlock, PageText, StatsContainer } from "../styles/global";
import { useDashPostFeedQuery, useDraftPostFeedQuery, usePostFeedQuery, useSummaryQuery } from "../generated/graphql";
import { Link } from "react-router-dom";
import LoadingComponent from "../components/utils/LoadingComponent";
import PostComponent from "../components/layouts/items/PostComponent";
import { devices } from "../styles/devices";

const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const PublicPostsGrid = styled.div`
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

const AnalyticsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`;

const AnalyticsTitle = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 4px solid #000000;
`;

export const AnalyticsStatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (min-width: 650px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const AnalyticsStatContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;
    align-items: center;
`;

export const InfoContainer = styled.div`
    display: block;
    font-weight: 700;
    font-size: 64px;
`;

export const InfoTypeContainer = styled(PageText)`
    font-size: 16px;
`;

function HomePage() {
    const { data: dashPostsData } = useDashPostFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data, loading, error } = usePostFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data: draftPostsData } = useDraftPostFeedQuery({ fetchPolicy: "cache-and-network" });
    
    const { data: analyticsData } = useSummaryQuery({ fetchPolicy: "cache-and-network" });
    
    return (
        <>
            <Head
                title="Dashboard | ingrao.blog"
                description="This is the dashboard homepage."
            />
            <PageLayout content={
                <PageContentLayout content={
                    <HomePageContainer>
                        <DashStatsContainer>
                            <StatsContainer>
                                <DataContainer>{dashPostsData?.dashPostFeed.length}</DataContainer>
                                <DataTypeContainer>Total number of posts</DataTypeContainer>
                            </StatsContainer>
                            <StatsContainer>
                                <DataContainer>{data?.postFeed.length}</DataContainer>
                                <DataTypeContainer>Number of your public posts</DataTypeContainer>
                            </StatsContainer>
                            <StatsContainer>
                                <DataContainer>{draftPostsData?.draftPostFeed.length}</DataContainer>
                                <DataTypeContainer>Number of <Link to="/create-post" title="Your drafts" aria-label="Your drafts">your drafts</Link></DataTypeContainer>
                            </StatsContainer>
                        </DashStatsContainer>
                        <AnalyticsContainer>
                            <PageBlock>
                                <AnalyticsTitle>Analytics</AnalyticsTitle>
                            </PageBlock>
                            <AnalyticsStatsContainer>
                                <AnalyticsStatContainer>
                                    <InfoContainer>{analyticsData?.summary.views}</InfoContainer>
                                    <InfoTypeContainer>Total number of visits in the last 28 days</InfoTypeContainer>
                                </AnalyticsStatContainer>
                                <AnalyticsStatContainer>
                                    <InfoContainer>{analyticsData?.summary.uniqueVisitorsVariation}%</InfoContainer>
                                    <InfoTypeContainer>Change in the number of visits compared to the previous 28-day period</InfoTypeContainer>
                                </AnalyticsStatContainer>
                                <AnalyticsStatContainer>
                                    <InfoContainer>{analyticsData?.summary.uniqueVisitors}</InfoContainer>
                                    <InfoTypeContainer>Number of unique visitors in the last 28 days</InfoTypeContainer>
                                </AnalyticsStatContainer>
                                <AnalyticsStatContainer>
                                    <InfoContainer>{analyticsData?.summary.uniqueVisitorsVariation}%</InfoContainer>
                                    <InfoTypeContainer>Change in the number of unique visitors compared to the previous 28-day period</InfoTypeContainer>
                                </AnalyticsStatContainer>
                            </AnalyticsStatsContainer>
                        </AnalyticsContainer>
                        <PageBlock>
                            <OptionContainer>
                                <OptionTitle>
                                    Your public posts
                                </OptionTitle>
                                <PageText>
                                    Here you can view and edit your public posts.
                                </PageText>
                                <PageBlock>
                                    {(loading && !data) || error ? (
                                        <LoadingContainer>
                                            <LoadingComponent />
                                        </LoadingContainer>
                                    ) : (
                                        <>
                                            {data?.postFeed?.length ===
                                            0 ? (
                                                <PageText>
                                                    You have no public posts.
                                                </PageText>
                                            ) : (
                                                <PublicPostsGrid>
                                                    {data?.postFeed?.map(
                                                        (post) => (
                                                            <PostComponent
                                                                key={
                                                                    post.id
                                                                }
                                                                post={post}
                                                            />
                                                        )
                                                    )}
                                                </PublicPostsGrid>
                                            )}
                                        </>
                                    )}
                                </PageBlock>
                            </OptionContainer>
                        </PageBlock>
                    </HomePageContainer>
                } />
            } />
        </>
    );
}

export default HomePage;
