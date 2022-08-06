import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import {
    LoadingContainer,
    LinkButton,
    LinkButtonText,
    OptionContainer,
    OptionsContainer,
    OptionTitle,
    PageBlock,
    PageText,
} from "../../styles/global";
import styled from "styled-components";
import Add from "../../components/icons/Add";
import { Outlet, useLocation } from "react-router-dom";
import { useDraftPostFeedQuery } from "../../generated/graphql";
import LoadingComponent from "../../components/utils/LoadingComponent";
import PostComponent from "../../components/layouts/items/PostComponent";
import { devices } from "../../styles/devices";

const CreateNewPostButton = styled(LinkButton)`
    color: #ffffff;
    background-color: blue;
`;

const PostGrid = styled.div`
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

function CreatePostPage() {
    const location = useLocation();

    const { data, loading, error } = useDraftPostFeedQuery({
        fetchPolicy: "cache-and-network",
    });

    return (
        <>
            <Head
                title="Create a new post | dashboard.ingrao.blog"
                description="In this page you can create a new post and update the existing ones."
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <OptionsContainer>
                                <OptionContainer>
                                    <OptionTitle>Create a new post</OptionTitle>
                                    <PageText>
                                        Click on the following button to create
                                        a new post.
                                    </PageText>
                                    <PageBlock>
                                        <CreateNewPostButton
                                            to="/create-post/new"
                                            state={{
                                                backgroundLocation: location,
                                            }}
                                        >
                                            <Add color={"#ffffff"} />
                                            <LinkButtonText>
                                                Create post
                                            </LinkButtonText>
                                        </CreateNewPostButton>
                                        <Outlet />
                                    </PageBlock>
                                </OptionContainer>
                                <OptionContainer>
                                    <OptionTitle>
                                        Edit unpublished posts
                                    </OptionTitle>
                                    <PageText>
                                        Here you can edit the unpublished posts.
                                    </PageText>
                                    <PageBlock>
                                        {(loading && !data) || error ? (
                                            <LoadingContainer>
                                                <LoadingComponent />
                                            </LoadingContainer>
                                        ) : (
                                            <>
                                                {data?.draftPostFeed?.length ===
                                                0 ? (
                                                    <PageText>
                                                        No posts need to be
                                                        updated or published.
                                                    </PageText>
                                                ) : (
                                                    <PostGrid>
                                                        {data?.draftPostFeed?.map(
                                                            (post) => (
                                                                <PostComponent
                                                                    key={
                                                                        post.id
                                                                    }
                                                                    post={post}
                                                                    draft={true}
                                                                />
                                                            )
                                                        )}
                                                    </PostGrid>
                                                )}
                                            </>
                                        )}
                                    </PageBlock>
                                </OptionContainer>
                            </OptionsContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default CreatePostPage;
