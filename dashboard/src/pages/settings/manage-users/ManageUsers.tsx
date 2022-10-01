import { useEffect, useState } from "react";
import Head from "../../../components/Head";
import PageLayout from "../../../components/layouts/PageLayout";
import PageContentLayout from "../../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../../components/utils/LoadingComponent";
import SearchBoxComponent from "../../../components/utils/SearchBox";
import { useDashUsersQuery, useMeQuery } from "../../../generated/graphql";
import { LinkButton, LinkButtonText, LoadingContainer, OptionContainer, OptionTitle, PageBlock, PageText, PageTextMB48 } from "../../../styles/global";
import SettingsComponent from "../SettingsComponent";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Add from "../../../components/icons/Add";

const PageExtraContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    margin-bottom: 48px;
`;

const AddDashUserButton = styled(LinkButton)`
    color: #ffffff;
    background-color: blue;
`;


function ManageUsers() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "cache-and-network",
        variables: { origin: "dash" },
    });

    const location = useLocation();

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
                                                <PageTextMB48>
                                                    In this page you can manage the dashboard users.
                                                </PageTextMB48>
                                                <PageExtraContent>
                                                    <OptionContainer>
                                                        <OptionTitle>
                                                            Add a new user
                                                        </OptionTitle>
                                                        <PageText>
                                                            Here you can add a new user to the dashboard.
                                                        </PageText>
                                                        <PageBlock>
                                                            <AddDashUserButton
                                                                to="/settings/manage-users/new"
                                                                state={{
                                                                    backgroundLocation: location,
                                                                }}
                                                            >
                                                                <Add color={"#ffffff"} />
                                                                <LinkButtonText>
                                                                    New user
                                                                </LinkButtonText>
                                                            </AddDashUserButton>
                                                            <Outlet />
                                                        </PageBlock>
                                                    </OptionContainer>
                                                </PageExtraContent>
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
