import Head from "../../../components/Head";
import PageLayout from "../../../components/layouts/PageLayout";
import PageContentLayout from "../../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../../components/utils/LoadingComponent";
import { MeDocument, MeQuery, useAuthSendVerificationEmailMutation, useMeQuery, User, useUnsubscribeFromNewsletterMutation } from "../../../generated/graphql";
import { Button, LinkButton, LoadingContainer, OptionContainer, OptionTitle, PageBlock, PageText, Status } from "../../../styles/global";
import styled from "styled-components";
import SettingsComponent from "../SettingsComponent";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { useState } from "react";

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

const NewsletterButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function AccountSettings() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "cache-and-network",
        variables: { origin: "blog" },
    });

    const location = useLocation();

    const [authSendEmail] = useAuthSendVerificationEmailMutation();

    const [unsubscribe] = useUnsubscribeFromNewsletterMutation();
    const [status, setStatus] = useState<String | null>(null);
    
    return (
        <>
            <Head
                title="Account settings | ingrao.blog"
                description="In this page you can modify the email address and password associated to your account."
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <SettingsComponent
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
                                                                        origin: "blog",
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
                                                    {data?.me?.newsletterSubscribed && (
                                                        <OptionContainer>
                                                            <OptionTitle>
                                                                Unsubscribe from the newsletter
                                                            </OptionTitle>
                                                            <PageText>
                                                                Here you can unsubscribe from the newsletter.
                                                            </PageText>
                                                            <PageBlock>
                                                                <NewsletterButton
                                                                    type="button"
                                                                    title="Stop receiving emails from us"
                                                                    role="button"
                                                                    aria-label="Stop receiving emails from us"
                                                                    onClick={async () => {
                                                                        setStatus(null);
                                                                        const response = await unsubscribe({
                                                                            update: (store, { data }) => {
                                                                                if (data && data.unsubscribeFromNewsletter && data.unsubscribeFromNewsletter.user) {
                                                                                    store.writeQuery<MeQuery>({
                                                                                        query: MeDocument,
                                                                                        data: {
                                                                                            me: data.unsubscribeFromNewsletter.user as User,
                                                                                        },
                                                                                    });
                                                                                }
                                                                            },
                                                                        });
                                                                        
                                                                        setStatus(response.data?.unsubscribeFromNewsletter.status!);
                                                                    }}
                                                                >
                                                                    Unsubscribe
                                                                </NewsletterButton>
                                                            </PageBlock>
                                                        </OptionContainer>
                                                    )}
                                                    {status && (
                                                        <Status>{status}</Status>
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