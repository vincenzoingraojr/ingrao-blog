import { useEffect, useState } from "react";
import Head from "../../../components/Head";
import PageLayout from "../../../components/layouts/PageLayout";
import PageContentLayout from "../../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../../components/utils/LoadingComponent";
import SearchBoxComponent from "../../../components/utils/SearchBox";
import { useDashUsersQuery, useMeQuery } from "../../../generated/graphql";
import { LoadingContainer, PageTextMB24 } from "../../../styles/global";
import SettingsComponent from "../SettingsComponent";

function ManageUsers() {
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

    const { data: dashUsersData } = useDashUsersQuery({ fetchPolicy: "cache-and-network" });

    return (
        <>
            <Head 
                title="Manage users | dashboard.ingrao.blog"
                description="In this page you can view and manage the dashboard users."
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
                                                    Manage users
                                                </SidebarLayoutTitle>
                                                <PageTextMB24>
                                                    In this page you can manage the dashboard users.
                                                </PageTextMB24>
                                                <SearchBoxComponent data={dashUsersData?.dashUsers || []} type="user" />
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

export default ManageUsers;
