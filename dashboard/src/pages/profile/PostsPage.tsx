import styled from "styled-components";
import Head from "../../components/Head";
import SmallPostComponent from "../../components/layouts/items/SmallPostComponent";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { useDraftPostFeedQuery, useMeQuery, usePostFeedQuery } from "../../generated/graphql";
import { LoadingContainer, OptionContainer, OptionTitle, PageBlock, PageText } from "../../styles/global";
import ProfilePageComponent from "./ProfilePageComponent";
import ErrorComponent from "../../components/utils/ErrorComponent";

const PostsPageContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const PostFeed = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

function PostsPage() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    const { data: postData, loading: postLoading, error: postError } = usePostFeedQuery({ fetchPolicy: "cache-and-network" });
    const { data: draftPostData, loading: draftPostLoading, error: draftPostError } = useDraftPostFeedQuery({ fetchPolicy: "cache-and-network" });

    return (
        <>
            <Head
                title="Your posts | dashboard.ingrao.blog"
                description="In this page you can view your posts and update your personal information."
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <ProfilePageComponent
                                content={
                                    <>
                                        {loading ? (
                                            <LoadingContainer>
                                                <LoadingComponent />
                                            </LoadingContainer>
                                        ) : (
                                            <>
                                                {data && data.me && data.me.posts && !error ? (
                                                    <>
                                                        <SidebarLayoutTitle>
                                                            Your posts
                                                        </SidebarLayoutTitle>
                                                        <PostsPageContent>
                                                            <PageText>
                                                                You've been working on {data.me.posts.length}{" "}{data.me.posts.length === 1 ? "post" : "posts"}. 
                                                            </PageText>
                                                            <OptionContainer>
                                                                <OptionTitle>
                                                                    Your published posts
                                                                </OptionTitle>
                                                                <PageText>
                                                                    Here you can view your published posts.
                                                                </PageText>
                                                                <PageBlock>
                                                                    {postLoading ? (
                                                                        <LoadingContainer>
                                                                            <LoadingComponent />
                                                                        </LoadingContainer>
                                                                    ) : (
                                                                        <>
                                                                            {postData && postData.postFeed && !postError ? (
                                                                                <>
                                                                                    {postData.postFeed.length ===
                                                                                    0 ? (
                                                                                        <PageText>
                                                                                            There are no published posts.
                                                                                        </PageText>
                                                                                    ) : (
                                                                                        <PostFeed>
                                                                                            {postData.postFeed.map(
                                                                                                (post) => (
                                                                                                    <SmallPostComponent
                                                                                                        key={
                                                                                                            post.id
                                                                                                        }
                                                                                                        post={post}
                                                                                                    />
                                                                                                )
                                                                                            )}
                                                                                        </PostFeed>
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <ErrorComponent />
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </PageBlock>
                                                            </OptionContainer>
                                                            <OptionContainer>
                                                                <OptionTitle>
                                                                    Your drafts
                                                                </OptionTitle>
                                                                <PageText>
                                                                    Here you can view your unpublished posts.
                                                                </PageText>
                                                                <PageBlock>
                                                                    {draftPostLoading ? (
                                                                        <LoadingContainer>
                                                                            <LoadingComponent />
                                                                        </LoadingContainer>
                                                                    ) : (
                                                                        <>
                                                                            {draftPostData && draftPostData.draftPostFeed && !draftPostError ? (
                                                                                <>
                                                                                    {draftPostData.draftPostFeed.length ===
                                                                                    0 ? (
                                                                                        <PageText>
                                                                                            There are no unpublished posts.
                                                                                        </PageText>
                                                                                    ) : (
                                                                                        <PostFeed>
                                                                                            {draftPostData.draftPostFeed.map(
                                                                                                (draftPost) => (
                                                                                                    <SmallPostComponent
                                                                                                        key={
                                                                                                            draftPost.id
                                                                                                        }
                                                                                                        post={draftPost}
                                                                                                    />
                                                                                                )
                                                                                            )}
                                                                                        </PostFeed>
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <ErrorComponent />
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </PageBlock>
                                                            </OptionContainer>
                                                        </PostsPageContent>
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

export default PostsPage;
