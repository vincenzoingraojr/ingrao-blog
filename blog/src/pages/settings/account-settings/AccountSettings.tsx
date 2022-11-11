import Head from "../../../components/Head";
import PageLayout from "../../../components/layouts/PageLayout";
import PageContentLayout from "../../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../../components/utils/LoadingComponent";
import { useAuthSendVerificationEmailMutation, useMeQuery } from "../../../generated/graphql";
import { Button, LinkButton, LoadingContainer, OptionContainer, OptionTitle, PageBlock, PageText, Status } from "../../../styles/global";
import styled from "styled-components";
import SettingsComponent from "../SettingsComponent";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";

const AccountSettingsPageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const EditAccountButton = styled(LinkButton)`
    color: #ffffff;
    background-color: blue;
`;

const VerifyEmailAddressButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function AccountSettings() {
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

    const [authSendEmail] = useAuthSendVerificationEmailMutation();
    
    return (
        <>
            <Head
                title="Account settings | dashboard.ingrao.blog"
                description="In this page you can modify the email address and password associated to your account."
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
                                                    Account settings
                                                </SidebarLayoutTitle>
                                                <AccountSettingsPageContent>
                                                    <PageText>
                                                        In this page you can modify the email address and password associated to your account. You can update your profile information <Link to="/profile" title="Your profile page" aria-label="Your profile page">in this page</Link>.
                                                    </PageText>
                                                    <OptionContainer>
                                                        <OptionTitle>
                                                            Modify your email address
                                                        </OptionTitle>
                                                        <PageText>
                                                            Here you can modify your email address. Current email address:{" "}<b>{data?.me?.email}</b>
                                                        </PageText>
                                                        <PageBlock>
                                                            <EditAccountButton
                                                                to="/settings/account/email-address"
                                                                state={{
                                                                    backgroundLocation: location,
                                                                }}
                                                            >
                                                                Edit email address
                                                            </EditAccountButton>
                                                            <Outlet />
                                                        </PageBlock>
                                                    </OptionContainer>
                                                    <OptionContainer>
                                                        <OptionTitle>
                                                            Change your password
                                                        </OptionTitle>
                                                        <PageText>
                                                            Here you can change your account password.
                                                        </PageText>
                                                        <PageBlock>
                                                            <EditAccountButton
                                                                to="/settings/account/password"
                                                                state={{
                                                                    backgroundLocation: location,
                                                                }}
                                                            >
                                                                Change password
                                                            </EditAccountButton>
                                                            <Outlet />
                                                        </PageBlock>
                                                    </OptionContainer>
                                                    {!data?.me?.verified && (
                                                        <OptionContainer>
                                                            <OptionTitle>
                                                                Send verification email
                                                            </OptionTitle>
                                                            <PageText>
                                                                Your email address is not verified. Click the button below so we send you an email with the instructions to verify your email address.
                                                            </PageText>
                                                            <PageBlock>
                                                                <Formik
                                                                    initialValues={{
                                                                        origin: "dash",
                                                                    }}
                                                                    onSubmit={async (
                                                                        values,
                                                                        { setStatus }
                                                                    ) => {
                                                                        const response = await authSendEmail({
                                                                            variables: values,
                                                                        });

                                                                        setStatus(
                                                                            response?.data?.authSendVerificationEmail
                                                                                .status
                                                                        );
                                                                    }}
                                                                >
                                                                    {({ status }) => (
                                                                        <Form>
                                                                            {status ? <Status>{status}</Status> : null}
                                                                            <PageBlock>
                                                                                <VerifyEmailAddressButton
                                                                                    type="submit"
                                                                                    title="Verify email address"
                                                                                    role="button"
                                                                                    aria-label="Verify email address"
                                                                                >
                                                                                    Verify email address
                                                                                </VerifyEmailAddressButton>
                                                                            </PageBlock>
                                                                        </Form>
                                                                    )}
                                                                </Formik>
                                                            </PageBlock>
                                                        </OptionContainer>
                                                    )}
                                                </AccountSettingsPageContent>
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

export default AccountSettings;