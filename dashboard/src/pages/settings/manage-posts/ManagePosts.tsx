import { useEffect, useState } from "react";
import Head from "../../../components/Head";
import PageLayout from "../../../components/layouts/PageLayout";
import PageContentLayout from "../../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../../components/utils/LoadingComponent";
import SearchBoxComponent from "../../../components/utils/SearchBox";
import { useDashPostFeedQuery, useMeQuery } from "../../../generated/graphql";
import { LoadingContainer, PageTextMB24 } from "../../../styles/global";
import SettingsComponent from "../SettingsComponent";
import ErrorComponent from "../../../components/utils/ErrorComponent";

function ManagePosts() {
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

    const { data: dashPostsData, loading: dashPostsLoading, error: dashPostsError } = useDashPostFeedQuery({ fetchPolicy: "network-only" });

    return (
        <>
            <Head 
                title="Manage posts | dashboard.ingrao.blog"
                description="In this page you can view and manage all the ingrao.blog posts."
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <SettingsComponent
                                isAdmin={isAdmin}
                                content={
                                    <>
                                        {(loading || dashPostsLoading) ? (
                                            <LoadingContainer>
                                                <LoadingComponent />
                                            </LoadingContainer>
                                        ) : (
                                            <>
                                                {data && dashPostsData && !error && !dashPostsError ? (
                                                    <>
                                                        <SidebarLayoutTitle>
                                                            Manage posts
                                                        </SidebarLayoutTitle>
                                                        <PageTextMB24>
                                                            In this page you can manage all the posts.
                                                        </PageTextMB24>
                                                        <SearchBoxComponent data={dashPostsData.dashPostFeed} type="post" />  
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

export default ManagePosts;