import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import styled from "styled-components";
import { Post, useBlogFeedQuery } from "../generated/graphql";
import { devices } from "../styles/devices";
import { LoadingContainer, OptionTitle, PageText } from "../styles/global";
import LoadingComponent from "../components/utils/LoadingComponent";
import { useEffect, useState } from "react";
import PostComponent from "../components/layouts/items/PostComponent";
import { useNavigate } from "react-router-dom";

const IndexPageWrapper = styled.div`
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    min-height: calc(100vh - 140px);

    @media ${devices.tablet} {
        min-height: calc(100vh - 172px);
    }
`;

const IndexContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 48px;
    padding-top: 48px;
    padding-bottom: 48px;
`;

const LatestPostContainer = styled.div`
    display: block;
    width: 100%;
`;

const PostFeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
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

const LatestPostComponent = styled.div`
    display: block;
    width: 100%;
    cursor: pointer;
`;

const LatestPostInnerContainer = styled.div`
    display: grid;
    align-items: unset;
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;

    @media (min-width: 560px) {
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        gap: 18px;
    }
`;

const LatestPostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const HeadText = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 4px solid #000000;
`;

const LatestPostImage = styled.div`
    display: block;
    width: 100%;
    height: 100%;

    img {
        width: inherit;
        height: inherit;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
    }
`;

const LatestPostBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const LatestPostTitle = styled(PageText)`
    font-family: "Source Serif Pro", serif;
    font-weight: 700;
    font-size: 36px;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }

    @media ${devices.tablet} {
        font-size: 42px;
    }
`;

const LatestPostSmallText = styled(PageText)`
    font-size: 16px;
`;

function Index() {
    const { data, loading, error } = useBlogFeedQuery({ fetchPolicy: "cache-and-network" });
    
    const [latestPost, setLatestPost] = useState<Post>();
    const [otherPosts, setOtherPosts] = useState<Post[]>(data?.blogFeed || []);

    useEffect(() => {
        if (data && data.blogFeed) {
            setLatestPost(data.blogFeed[0]);
            setOtherPosts(data.blogFeed.filter((_, i) => i !== 0));
        }
    }, [data]);

    const navigate = useNavigate();

    let date = "";
    date = new Date(parseInt(latestPost?.updatedAt as string)).toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <>
            <Head title="Index | ingrao.blog" description="This is the index page of ingrao.blog." />
            <PageLayout content={
                <IndexPageWrapper>
                    {loading || !data || error ? (
                        <LoadingContainer>
                            <LoadingComponent />
                        </LoadingContainer>
                    ) : (
                        <IndexContainer>
                            <LatestPostContainer>
                                <LatestPostComponent
                                    onClick={() => {
                                        navigate(`/post/${latestPost?.slug}`);
                                    }}
                                    role="link"
                                    title={latestPost?.title as string}
                                    aria-label={latestPost?.title as string}
                                >
                                    <LatestPostInnerContainer>
                                        <LatestPostImage>
                                            <img
                                                src={
                                                    latestPost?.postCover as string
                                                }
                                                title={
                                                    latestPost?.title as string
                                                }
                                                alt={
                                                    latestPost?.title as string
                                                }
                                            />
                                        </LatestPostImage>
                                        <LatestPostBody>
                                            <LatestPostHeader>
                                                <HeadText>
                                                    {latestPost?.slogan}
                                                </HeadText>
                                            </LatestPostHeader>
                                            <LatestPostTitle>
                                                {latestPost?.title}
                                            </LatestPostTitle>
                                            <PageText>{latestPost?.description}</PageText>
                                            <LatestPostSmallText>
                                                Written by{" "}
                                                <b>
                                                    {latestPost?.author.firstName} {latestPost?.author.lastName}
                                                </b>
                                            </LatestPostSmallText>
                                            <LatestPostSmallText>
                                                Published on {date}
                                            </LatestPostSmallText>
                                        </LatestPostBody>
                                    </LatestPostInnerContainer>
                                </LatestPostComponent>
                            </LatestPostContainer>
                            {otherPosts.length > 0 && (
                                <PostFeedContainer>
                                    <OptionTitle>
                                        Other posts
                                    </OptionTitle>
                                    <PostGrid>
                                        {otherPosts.map((post) => (
                                            <PostComponent post={post} key={post.id} />
                                        ))}
                                    </PostGrid>
                                </PostFeedContainer>
                            )}
                        </IndexContainer>
                    )}
                </IndexPageWrapper>
            } />
        </>
    );
}

export default Index;
