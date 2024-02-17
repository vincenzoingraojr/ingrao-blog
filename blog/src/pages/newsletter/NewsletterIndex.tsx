import { Link } from "react-router-dom";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../../components/layouts/sublayouts/StandardPageLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import SearchBoxComponent from "../../components/utils/SearchBox";
import { MeDocument, MeQuery, useMeQuery, useNewsletterBlogFeedQuery, User, useSubscribeToNewsletterMutation } from "../../generated/graphql";
import { Button, LoadingContainer, PageTextMB24, PageTextMB48, Status } from "../../styles/global";
import styled from "styled-components";
import { useState } from "react";
import ErrorComponent from "../../components/utils/ErrorComponent";

const NewsletterButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function NewsletterIndex() {
    const { data, loading, error } = useNewsletterBlogFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data: meData } = useMeQuery({ fetchPolicy: "cache-and-network", variables: { origin: "blog" } });
    const [subscribe] = useSubscribeToNewsletterMutation();
    const [status, setStatus] = useState<String | null>(null);

    return (
        <>
            <Head
                title="Newsletter | ingrao.blog"
                description="In this page you can read the newsletter issues."
            />
            <PageLayout content={
                <PageContentLayout content={
                    <StandardPageLayout 
                        title="Newsletter"
                        description="In this page you can read the newsletter issues."
                        content={
                            <>
                                {loading ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <>
                                        {data && data.newsletterBlogFeed && !error ? (
                                            <>
                                                {status && (
                                                    <Status>{status}</Status>
                                                )}
                                                {meData && meData.me ? (
                                                    <>
                                                        {!meData.me.newsletterSubscribed && (
                                                            <PageTextMB48>
                                                                <PageTextMB24>
                                                                    Sign up to the newsletter
                                                                </PageTextMB24>
                                                                <NewsletterButton
                                                                    type="button"
                                                                    title="Sign up to the newsletter"
                                                                    role="button"
                                                                    aria-label="Sign up to the newsletter"
                                                                    onClick={async () => {
                                                                        setStatus(null);
                                                                        const response = await subscribe({
                                                                            update: (store, { data }) => {
                                                                                if (data && data.subscribeToNewsletter && data.subscribeToNewsletter.user) {
                                                                                    store.writeQuery<MeQuery>({
                                                                                        query: MeDocument,
                                                                                        data: {
                                                                                            me: data.subscribeToNewsletter.user as User,
                                                                                        },
                                                                                    });
                                                                                }
                                                                            },
                                                                        });
                                                                        
                                                                        if (response.data && response.data.subscribeToNewsletter && response.data.subscribeToNewsletter.status) {
                                                                            setStatus(response.data.subscribeToNewsletter.status);
                                                                        }
                                                                    }}
                                                                >
                                                                    Sign up
                                                                </NewsletterButton>
                                                            </PageTextMB48>
                                                        )}
                                                    </>
                                                ) : (
                                                    <PageTextMB48>
                                                        In order to sign up to the newsletter, you have to log in to the blog. <Link to="/login" title="Log in to ingrao.blog" aria-label="Log in to ingrao.blog">Log in here</Link>
                                                    </PageTextMB48>
                                                )}
                                                <SearchBoxComponent
                                                    data={data.newsletterBlogFeed}
                                                    type="newsletter"
                                                />
                                            </>
                                        ) : (
                                            <ErrorComponent />
                                        )}
                                    </>
                                )}
                            </>
                        }       
                    />
                } />
            } />
        </>
    );
}

export default NewsletterIndex;