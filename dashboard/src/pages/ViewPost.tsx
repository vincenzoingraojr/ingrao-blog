import { useEffect, useState } from "react";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { useFindPostBySlugQuery } from "../generated/graphql";
import styled from "styled-components";
import { ControlContainer, LoadingContainer, PageBlock, PageText, LinkButton } from "../styles/global";
import LoadingComponent from "../components/utils/LoadingComponent";
import { devices } from "../styles/devices";
import Arrow from "../components/icons/Arrow";
import { Editor } from "@ingrao-blog/editor";
import { processDate } from "../utils/processDate";

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

const PostHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
`;

const GoBackButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

const GoBackButtonText = styled(PageText)`
    font-weight: 700;
`;

const EditPostButton = styled(LinkButton)`
    color: #ffffff;
    background-color: #000000;
`;

function ViewPost() {
    const navigate = useNavigate();
    const params = useParams();
    const navigationType = useNavigationType();

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
    
    const [date, setDate] = useState("");

    useEffect(() => {
        if (data && data.findPostBySlug) {
            const publishDate = new Date(
                parseInt(
                    data.findPostBySlug
                        .publishedOn as string
                )
            ).toLocaleString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            if (data.findPostBySlug.isEdited) {
                const updatedPostDate = processDate(data.findPostBySlug.updatedAt);
                setDate(`Published on ${publishDate}, updated ${updatedPostDate}`);
            } else {
                setDate(publishDate);
            }
        }
    }, [data]);

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
                                        <PostHeader>
                                            <GoBackButton>
                                                <ControlContainer
                                                    title="Go back"
                                                    role="button"
                                                    aria-label="Go back"
                                                    onClick={() => {
                                                        if (navigationType === "POP") {
                                                            navigate("/");
                                                        } else {
                                                            navigate(-1);
                                                        }
                                                    }}
                                                >
                                                    <Arrow />
                                                </ControlContainer>
                                                <GoBackButtonText>
                                                    Go back
                                                </GoBackButtonText>
                                            </GoBackButton>
                                            <EditPostButton
                                                to={`/edit-post/${data?.findPostBySlug?.id}`}
                                                title="Edit post"
                                            >
                                                Edit post
                                            </EditPostButton>
                                        </PostHeader>
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
                                                {date}
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
