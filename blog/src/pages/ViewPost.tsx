import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { useFindPostBySlugQuery, useMeQuery, usePostCommentsQuery } from "../generated/graphql";
import styled from "styled-components";
import { LoadingContainer, PageBlock, PageText } from "../styles/global";
import LoadingComponent from "../components/utils/LoadingComponent";
import { devices } from "../styles/devices";
import { Editor } from "@ingrao-blog/editor";
import CommentComponent from "../components/layouts/items/CommentComponent";
import CommentInputComponent from "../components/utils/CommentInputComponent";
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

const PostComments = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
    margin-left: 0px;
    margin-right: 0px;

    @media ${devices.mobileL} {
        margin-left: 24px;
        margin-right: 24px;
    }

    @media ${devices.tablet} {
        margin-left: 10%;
        margin-right: 10%;
    }
`;

const CommentSectionTitle = styled.div`
    display: block;
    font-family: "Source Serif Pro", serif;
    font-weight: 700;
    font-size: 32px;
`;

const CommentSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 24px;
    border-top: 2px solid black;
`;

const CommentFeed = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

function ViewPost() {
    const navigate = useNavigate();
    const params = useParams();

    const { data, loading, error } = useFindPostBySlugQuery({
        fetchPolicy: "network-only",
        variables: { slug: params.slug! },
    });

    const { data: meData } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "blog" },
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

    const location = useLocation();

    const { data: postCommentsData, loading: postCommentsLoading, error: postCommentsError } = usePostCommentsQuery({ variables: { postId: data?.findPostBySlug?.id }, fetchPolicy: "network-only" });
    
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
                title={`${data?.findPostBySlug?.title} | ingrao.blog`}
                description={`In this page you can read "${data?.findPostBySlug?.title}", a post by ${data?.findPostBySlug?.author.firstName} ${data?.findPostBySlug?.author.lastName}.`}
                blogPost={true}
                image={data?.findPostBySlug?.postCover!}
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
                                                {date}
                                            </PostDate>
                                        </PostInfo>
                                        <PostCoverImage>
                                            <img
                                                src={
                                                    data?.findPostBySlug
                                                        ?.postCover!
                                                }
                                                title={`Post cover: ${data?.findPostBySlug?.title}`}
                                                alt={`Post cover: ${data?.findPostBySlug?.title}`}
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
                                        <PostComments>
                                            <CommentSectionTitle>
                                                Comments
                                            </CommentSectionTitle>
                                            {meData && meData.me ? (
                                                <>
                                                    <PageText>
                                                        Here you can see all the comments related to the post. You can also create a new comment. I ask you to be polite and help create a positive (and also elegant) environment in this blog.
                                                    </PageText>
                                                    <CommentInputComponent postId={data?.findPostBySlug?.id!} commentsData={postCommentsData?.postComments} isReplyTo={""} />
                                                    <CommentSectionContainer>
                                                        {(postCommentsLoading && !postCommentsData) || postCommentsError ? (
                                                            <LoadingContainer>
                                                                <LoadingComponent />
                                                            </LoadingContainer>
                                                        ) : (
                                                            <>
                                                                {postCommentsData?.postComments?.length ===
                                                                0 ? (
                                                                    <PageText>
                                                                        There are no comments.
                                                                    </PageText>
                                                                ) : (
                                                                    <CommentFeed>
                                                                        {postCommentsData?.postComments?.map(
                                                                            (comment) => (
                                                                                <CommentComponent
                                                                                    key={
                                                                                        comment.id
                                                                                    }
                                                                                    postId={data?.findPostBySlug?.id!}
                                                                                    comment={comment}
                                                                                />
                                                                            )
                                                                        )}
                                                                    </CommentFeed>
                                                                )}
                                                            </>
                                                        )}
                                                    </CommentSectionContainer>
                                                </>
                                            ) : (
                                                <PageText>
                                                    In order to view the comments and create a new one, you have to <Link to="/login" state={{ backgroundLocation: location }} title="Log in to the blog" aria-label="Log in to the blog">log in</Link> to the blog.
                                                    <Outlet />
                                                </PageText>
                                            )}
                                        </PostComments>
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
