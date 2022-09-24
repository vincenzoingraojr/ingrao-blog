import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../../components/Head";
import FocusPageLayout from "../../components/layouts/FocusPageLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { useFindPostQuery } from "../../generated/graphql";
import { LoadingContainer, PageBlock, PageText } from "../../styles/global";
import UpdatePostComponent from "./UpdatePostComponent";
import postCover from "../../images/post-cover.svg";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import { processDate } from "../../utils/processDate";
import { Remirror, useRemirror } from "@remirror/react";
import type { RemirrorJSON } from "remirror";
import { BoldExtension, ItalicExtension, LinkExtension, ShortcutsExtension, StrikeExtension, SubExtension, SupExtension, UnderlineExtension, HistoryExtension, HorizontalRuleExtension, HeadingExtension, BulletListExtension, HardBreakExtension, OrderedListExtension, CalloutExtension } from "remirror/extensions";

const PostPreviewImage = styled.div`
    display: block;

    img {
        width: 100%;
        height: auto;
    }
`;

const PostPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const PostPreviewTitle = styled.div`
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

const PostPreviewSlogan = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 2px solid #000000;
`;

const PostPreviewInfo = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 16px;
    column-gap: 12px;
    row-gap: 4px;
`;

const PostPreviewDate = styled.div`
    display: block;
    color: #c0c0c0;
`;

const PostPreviewContent = styled.div`
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

function PostPreview() {
    const navigate = useNavigate();
    const params = useParams();
    
    const { data, loading, error } = useFindPostQuery({
        fetchPolicy: "network-only",
        variables: { id: parseInt(params.id!) },
    });

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findPost) {
                console.log("Post found.");
            } else {
                navigate("/");
            }
        } else {
            console.log("Loading...");
        }
    }, [navigate, data, loading, error]);

    const { manager } = useRemirror({
        extensions: () => [
            new BoldExtension(),
            new ItalicExtension(),
            new LinkExtension({ autoLink: true }),
            new ShortcutsExtension(),
            new StrikeExtension(),
            new SubExtension(),
            new SupExtension(),
            new UnderlineExtension(),
            new HistoryExtension(),
            new HorizontalRuleExtension(),
            new HeadingExtension(),
            new BulletListExtension(),
            new HardBreakExtension(),
            new OrderedListExtension(),
            new CalloutExtension({ defaultType: "warn" }),
        ],
    });

    const [postContent, setPostContent] = useState<RemirrorJSON | undefined>(undefined);
    const [contentReady, setContentReady] = useState(false);

    useEffect(() => {
        const content = data?.findPost?.content;

        if (content) {
            setContentReady(true);
            setPostContent(JSON.parse(content));
        } else {
            setContentReady(false);
            setPostContent(undefined);
        }
    }, [data?.findPost?.content]);

    return (
        <>
            <Head
                title={`${data?.findPost?.title} | Preview on dashboard.ingrao.blog`}
                description="In this page you can view the post preview."
            />
            <FocusPageLayout
                title={`Update post ${params.id}`}
                content={
                    <UpdatePostComponent
                        id={params.id!}
                        content={
                            <>
                                {(loading && !data) || error ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <PostPreviewContainer>
                                        <PageBlock>
                                            <PostPreviewSlogan>
                                                {data?.findPost?.slogan !== "" ? data?.findPost?.slogan : "Slogan"}
                                            </PostPreviewSlogan>
                                        </PageBlock>
                                        <PostPreviewTitle>
                                            {data?.findPost?.title !== "" ? data?.findPost?.title : "Title"}
                                        </PostPreviewTitle>
                                        <PageText>
                                            {data?.findPost?.description !== "" ? data?.findPost?.description : "Post description."}
                                        </PageText>
                                        <PostPreviewInfo>
                                            <PageBlock>By <strong>{data?.findPost?.author.firstName}{" "}{data?.findPost?.author.lastName}</strong></PageBlock>
                                            <PageText>|</PageText>
                                            <PostPreviewDate>{new Date(parseInt(data?.findPost?.updatedAt!)).toLocaleString("en-us", { month: "long", day: "numeric", year: "numeric" })},{" "}updated{" "}{processDate(data?.findPost?.updatedAt!)}</PostPreviewDate>
                                        </PostPreviewInfo>
                                        <PostPreviewImage>
                                            <img
                                                src={
                                                    data
                                                        ?.findPost
                                                        ?.postCover !==
                                                        "" &&
                                                    data
                                                        ?.findPost
                                                        ?.postCover !==
                                                        null
                                                        ? data
                                                                ?.findPost
                                                                ?.postCover
                                                        : postCover
                                                }
                                                title={`Cover of post ${data?.findPost?.id}`}
                                                alt={`Cover of post ${data?.findPost?.id}`}
                                            />
                                        </PostPreviewImage>
                                        {contentReady && (
                                            <PostPreviewContent>
                                                <Remirror editable={false} manager={manager} initialContent={postContent} />
                                            </PostPreviewContent>
                                        )}
                                    </PostPreviewContainer>
                                )}
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default PostPreview;
