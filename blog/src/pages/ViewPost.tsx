import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { useFindPostBySlugQuery } from "../generated/graphql";
import styled from "styled-components";
import { LoadingContainer, PageBlock, PageText } from "../styles/global";
import LoadingComponent from "../components/utils/LoadingComponent";
import { devices } from "../styles/devices";
import { Editor } from "@ingrao-blog/editor";

const PostCoverImage = styled.div`
    display: block;

    img {
        width: 100%;
        height: auto;
    }
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const PostTitle = styled.div`
    display: block;
    font-family: "Source Serif Pro", serif;
    font-weight: 700;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

const PostSlogan = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 4px solid #000000;
`;

const PostInfo = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 16px;
    column-gap: 12px;
    row-gap: 4px;
`;

const PostDate = styled.div`
    display: block;
    color: #c0c0c0;
`;

const PostContent = styled.div`
    display: block;
    margin-left: 0px;
    margin-right: 0px;
    font-family: "Source Serif Pro", serif;

    @media ${devices.mobileL} {
        margin-left: 24px;
        margin-right: 24px;
    }

    @media ${devices.tablet} {
        margin-left: 10%;
        margin-right: 10%;
    }
`;

function ViewPost() {
    const navigate = useNavigate();
    const params = useParams();

    const { data, loading, error } = useFindPostBySlugQuery({
        fetchPolicy: "network-only",
        variables: { slug: params.slug! },
    });

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findPostBySlug && !data.findPostBySlug.draft) {
                console.log("Post found.");
            } else {
                navigate("/");
            }
        } else {
            console.log("Loading...");
        }
    }, [navigate, data, loading, error]);

    const [postContent, setPostContent] = useState<any | undefined>(
        undefined
    );
    const [contentReady, setContentReady] = useState(false);

    useEffect(() => {
        const content = data?.findPostBySlug?.content;

        if (content) {
            setContentReady(true);
            setPostContent(JSON.parse(content));
        } else {
            setContentReady(false);
            setPostContent(undefined);
        }
    }, [data?.findPostBySlug?.content]);
    
    return (
        <>
            <Head
                title={`${data?.findPostBySlug?.title} | dashboard.ingrao.blog`}
                description={`In this page you can read "${data?.findPostBySlug?.title}", a post by ${data?.findPostBySlug?.author.firstName} ${data?.findPostBySlug?.author.lastName}.`}
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <>
                                {(loading && !data) || error ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <PostContainer>
                                        <PageBlock>
                                            <PostSlogan>
                                                {data?.findPostBySlug?.slogan}
                                            </PostSlogan>
                                        </PageBlock>
                                        <PostTitle>
                                            {data?.findPostBySlug?.title}
                                        </PostTitle>
                                        <PageText>
                                            {data?.findPostBySlug?.description}
                                        </PageText>
                                        <PostInfo>
                                            <PageBlock>
                                                By{" "}
                                                <strong>
                                                    {
                                                        data?.findPostBySlug?.author
                                                            .firstName
                                                    }{" "}
                                                    {
                                                        data?.findPostBySlug?.author
                                                            .lastName
                                                    }
                                                </strong>
                                            </PageBlock>
                                            <PageText>|</PageText>
                                            <PostDate>
                                                {new Date(
                                                    parseInt(
                                                        data?.findPostBySlug
                                                            ?.updatedAt!
                                                    )
                                                ).toLocaleString("en-us", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </PostDate>
                                        </PostInfo>
                                        <PostCoverImage>
                                            <img
                                                src={
                                                    data?.findPostBySlug
                                                        ?.postCover!
                                                }
                                                title={`Cover of post ${data?.findPostBySlug?.id}: ${data?.findPostBySlug?.title}`}
                                                alt={`Cover of post ${data?.findPostBySlug?.id}: ${data?.findPostBySlug?.title}`}
                                            />
                                        </PostCoverImage>
                                        {contentReady && (
                                            <PostContent>
                                                <Editor
                                                    readOnly={true}
                                                    toolbarHidden={true}
                                                    initialContentState={postContent}
                                                />
                                            </PostContent>
                                        )}
                                    </PostContainer>
                                )}
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default ViewPost;
