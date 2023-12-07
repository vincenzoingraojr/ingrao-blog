import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import styled from "styled-components";
import { DashStatsContainer, DataContainer, DataTypeContainer, LoadingContainer, OptionContainer, OptionTitle, PageBlock, PageText, StatsContainer } from "../styles/global";
import { useDashPostFeedQuery, useDraftPostFeedQuery, usePostFeedQuery, useSummaryQuery, useUserFrequenciesQuery } from "../generated/graphql";
import { Link } from "react-router-dom";
import LoadingComponent from "../components/utils/LoadingComponent";
import PostComponent from "../components/layouts/items/PostComponent";
import { devices } from "../styles/devices";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    ChartData,
    Point,
    Filler,
    ArcElement,
    Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Filler,
    Legend,
);

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

const AnalyticsChart = styled.div`
    display: block;
    width: 100%;
    height: 100%;

    canvas {
        display: block;
        box-sizing: border-box;
        width: 100% !important;
        height: 100% !important;
    }

    @media ${devices.tablet} {
        height: auto;

        canvas {
            height: auto !important;
        }
    }
`;

const OtherAnalyticsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;

    @media (min-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const PieChartContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;

    canvas {
        display: block;
        box-sizing: border-box;
        width: 100% !important;
        height: 100% !important;
    }

    @media ${devices.tablet} {
        height: auto;

        canvas {
            height: auto !important;
        }
    }
`;

function HomePage() {
    const { data: dashPostsData } = useDashPostFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data, loading, error } = usePostFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data: draftPostsData } = useDraftPostFeedQuery({ fetchPolicy: "cache-and-network" });
    
    const { data: analyticsData } = useSummaryQuery({ fetchPolicy: "cache-and-network" });

    const formatter = Intl.NumberFormat("en-US", { notation: "compact" });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        plugins: {
            label: {
                font: {
                    family: "Roboto Condensed",
                    size: 12,
                },
                color: "#000000",
            },
            legend: {
                display: true,
                position: "top" as const,
                labels: {
                    font: {
                        family: "Roboto Condensed",
                        size: 12,
                    },
                    color: "#000000",
                },
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
                titleColor: "#ffffff",
                titleFont: {
                    family: "Roboto Condensed",
                    weight: "normal" as const,
                },
                bodyColor: "#ffffff",
                bodyFont: {
                    family: "Roboto Condensed",
                    weight: "normal" as const,
                },
                backgroundColor: "#000000",
            },
        },
        stacked: false,
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
                ticks: {
                    font: {
                        family: "Roboto Condensed",
                        size: 12,
                    },
                },
                min: 0,
            },
            x: {
                type: "category" as const,
                display: true,
                position: "bottom" as const,
                ticks: {
                    font: {
                        family: "Roboto Condensed",
                        size: 12,
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        plugins: {
            tooltip: {
                mode: "index" as const,
                intersect: false,
                titleColor: "#ffffff",
                titleFont: {
                    family: "Roboto Condensed",
                    weight: "normal" as const,
                },
                bodyColor: "#ffffff",
                bodyFont: {
                    family: "Roboto Condensed",
                    weight: "normal" as const,
                },
                backgroundColor: "#000000",
            },
            legend: {
                display: true,
                position: "top" as const,
                labels: {
                    font: {
                        family: "Roboto Condensed",
                        size: 12,
                    },
                    color: "#000000",
                },
            },
        },
        stacked: false,
        scales: {
            y: {
                display: false,
            },
            x: {
                display: false,
            },
        },
    };

    const chartData: ChartData<"line", (string | Point | null)[], unknown> = {
        labels: analyticsData?.summary.viewsByDay.map((day) => new Date(day.date).toLocaleString("en-us", { month: "2-digit", day: "2-digit", year: "2-digit" })) || [],
        datasets: [
            {
                label: "Views",
                data: analyticsData?.summary.viewsByDay.map((day) => formatter.format(day.views)) || [],
                fill: true,
                backgroundColor: "#c0c0c0",
                borderColor: "#000000",
                pointBackgroundColor: "#000000",
            },
        ],
    };

    const { data: userFrequenciesData } = useUserFrequenciesQuery({ fetchPolicy: "cache-and-network" });

    const [pieLabels, setPieLabels] = useState<string[]>(["Authenticated users", "Unauthenticated users"]);
    const [pieColors, setPieColors] = useState<string[]>(["#c0c0c0", "#0000ff"]);

    useEffect(() => {
        if (userFrequenciesData) {
            if (userFrequenciesData.userFrequencies.authenticatedUsers === 0) {
                setPieLabels(["Unauthenticated users"]);
                setPieColors(["#0000ff"]);
            } else if (userFrequenciesData.userFrequencies.unAuthenticatedUsers === 0) {
                setPieLabels(["Authenticated users"]);
                setPieColors(["#c0c0c0"]);
            } else {
                setPieLabels(["Authenticated users", "Unauthenticated users"]);
                setPieColors(["#c0c0c0", "#0000ff"]);
            }
        }
    }, [userFrequenciesData]);

    const pieData = {
        labels: pieLabels,
        datasets: [
            {
                data: [userFrequenciesData?.userFrequencies.authenticatedUsers as number, userFrequenciesData?.userFrequencies.unAuthenticatedUsers as number].filter((data) => data > 0),
                fill: true,
                backgroundColor: pieColors,
                borderColor: pieColors,
            },
        ],
    }

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
                                    <InfoContainer>{formatter.format(analyticsData?.summary.views as number || 0)}</InfoContainer>
                                    <InfoTypeContainer>Total number of visits in the last 28 days</InfoTypeContainer>
                                </AnalyticsStatContainer>
                                <AnalyticsStatContainer>
                                    <InfoContainer>{analyticsData?.summary.viewsVariation.toFixed(1)}%</InfoContainer>
                                    <InfoTypeContainer>Change in the number of visits compared to the previous 28-day period</InfoTypeContainer>
                                </AnalyticsStatContainer>
                                <AnalyticsStatContainer>
                                    <InfoContainer>{formatter.format(analyticsData?.summary.uniqueVisitors as number || 0)}</InfoContainer>
                                    <InfoTypeContainer>Number of unique visitors in the last 28 days</InfoTypeContainer>
                                </AnalyticsStatContainer>
                                <AnalyticsStatContainer>
                                    <InfoContainer>{analyticsData?.summary.uniqueVisitorsVariation.toFixed(1)}%</InfoContainer>
                                    <InfoTypeContainer>Change in the number of unique visitors compared to the previous 28-day period</InfoTypeContainer>
                                </AnalyticsStatContainer>
                            </AnalyticsStatsContainer>
                            <AnalyticsChart>
                                <Line data={chartData} options={options} />
                            </AnalyticsChart>
                            <OtherAnalyticsContainer>
                                <PieChartContainer>
                                    <Pie data={pieData} options={pieOptions} />
                                </PieChartContainer>
                            </OtherAnalyticsContainer>
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
