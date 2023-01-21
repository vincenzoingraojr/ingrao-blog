import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import { PostCommentsDocument, PostCommentsQuery, useCreateCommentMutation, useFindPostBySlugQuery, useMeQuery, usePostCommentsQuery } from "../generated/graphql";
import styled from "styled-components";
import { Button, FlexContainer24, LoadingContainer, PageBlock, PageText } from "../styles/global";
import LoadingComponent from "../components/utils/LoadingComponent";
import { devices } from "../styles/devices";
import { Editor } from "@ingrao-blog/editor";
import { Form, Formik } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import EditorField from "../components/input/content/EditorField";
import CommentComponent from "../components/layouts/items/CommentComponent";

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

const CreateCommentComponent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 2px solid black;
`;

const CreateCommentButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
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
        fetchPolicy: "cache-and-network",
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

    const [createComment] = useCreateCommentMutation();
    const { data: postCommentsData, loading: postCommentsLoading, error: postCommentsError } = usePostCommentsQuery({ variables: { postId: data?.findPostBySlug?.id }, fetchPolicy: "network-only" });
    
    return (
        <>
            <Head
                title={`${data?.findPostBySlug?.title} | dashboard.ingrao.blog`}
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
                                                    <CreateCommentComponent>
                                                        <Formik
                                                            initialValues={{
                                                                content: "",
                                                                postId: data?.findPostBySlug?.id!,
                                                                isReplyTo: "",
                                                            }}
                                                            onSubmit={async (values, { setErrors }) => {
                                                                const response = await createComment({
                                                                    variables: values,
                                                                    update: (store, { data }) => {
                                                                        if (
                                                                            data &&
                                                                            data.createComment &&
                                                                            data.createComment.comment
                                                                        ) {
                                                                            store.writeQuery<PostCommentsQuery>({
                                                                                query: PostCommentsDocument,
                                                                                data: {
                                                                                    postComments: [
                                                                                        data.createComment.comment,
                                                                                        ...postCommentsData?.postComments!,
                                                                                    ],
                                                                                },
                                                                            });
                                                                        }
                                                                    },
                                                                });
                                            
                                                                if (
                                                                    response.data?.createComment.errors &&
                                                                    response.data.createComment.errors.length !== 0
                                                                ) {
                                                                    setErrors(toErrorMap(response.data.createComment.errors));
                                                                }
                                                            }}
                                                        >
                                                            {({
                                                                errors
                                                            }) => (
                                                                <Form>
                                                                    <FlexContainer24>
                                                                        <EditorField
                                                                            field="content"
                                                                            itemId={data?.findPostBySlug?.id}
                                                                            errors={
                                                                                errors
                                                                            }
                                                                        />
                                                                        <PageBlock>
                                                                            <CreateCommentButton
                                                                                type="submit"
                                                                                title="Publish comment"
                                                                                role="button"
                                                                                aria-label="Publish comment"
                                                                            >
                                                                                Publish comment
                                                                            </CreateCommentButton>
                                                                        </PageBlock>
                                                                    </FlexContainer24>
                                                                </Form>
                                                            )}
                                                        </Formik>
                                                    </CreateCommentComponent>
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
