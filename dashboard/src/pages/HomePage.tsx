import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import styled from "styled-components";
import { DashStatsContainer, DataContainer, DataTypeContainer, LoadingContainer, OptionContainer, OptionTitle, PageBlock, PageText, StatsContainer } from "../styles/global";
import { useDashPostFeedQuery, useDraftPostFeedQuery, usePostFeedQuery } from "../generated/graphql";
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

function HomePage() {
    const { data: dashPostsData } = useDashPostFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data, loading, error } = usePostFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data: draftPostsData } = useDraftPostFeedQuery({ fetchPolicy: "cache-and-network" });
    
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
