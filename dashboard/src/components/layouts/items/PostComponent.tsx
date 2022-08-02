import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import postCover from "../../../images/post-cover.svg";
import { ControlContainer, PageText } from "../../../styles/global";
import { processDate } from "../../../utils/processDate";
import More from "../../icons/More";

interface PostComponentProps {
    post: any;
    draft: boolean;
}

const PostContainer = styled.div`
    display: block;
    width: 100%;
    cursor: pointer;
`;

const PostInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

const HeadText = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 2px solid #000000;
`;

const PostImage = styled.div`
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

const PostBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const PostTitle = styled(PageText)`
    font-weight: 700;
    font-size: 24px;
    text-decoration: none;

    &:hover, &:focus {
        text-decoration: underline;
    }
`;

const PostSmallText = styled(PageText)`
    font-size: 16px;
`;

const PostComponent: FunctionComponent<PostComponentProps> = ({ post, draft }) => {
    const navigate = useNavigate();
    let date = "";

    if (draft) {
        date = processDate(post.updatedAt);
    } else {
        date = new Date(parseInt(post.updatedAt)).toLocaleString("en-us", { month: "long", day: "numeric", year: "numeric" });
    }

    return (
        <PostContainer
            onClick={() => {
                navigate(draft ? `/update-post/${post.id}` : `/post/${post.slug}`);
            }}
            role="link"
            title={draft ? `Unpublished post: ${post.id}` : `${post.title}`}
            aria-label={draft ? `Unpublished post: ${post.id}` : `${post.title}`}
        >
            <PostInnerContainer>
                <PostHeader>
                    <HeadText>
                        {draft ? <>Unpublished post: {post.id}</> : <>{post.slogan}</>}
                    </HeadText>
                    <ControlContainer role="button" size={26} onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <More />
                    </ControlContainer>
                </PostHeader>
                <PostImage>
                    <img
                        src={
                            post.postCover !== null && post.postCover !== "" ? 
                            post.postCover : postCover
                        }
                        title={draft ? `Unpublished post (${post.id}) cover image` : `${post.title}`}
                        alt={draft ? `Unpublished post (${post.id}) cover` : `${post.title}`}
                    />
                </PostImage>
                <PostBody>
                    <PostTitle>
                        {post.title !== null && post.title !== "" ? <>{post.title}</> : <>{post.slug}</>}
                    </PostTitle>
                    {post.description && (
                        <PageText>
                            {post.description}
                        </PageText>
                    )}
                    <PostSmallText>
                        Written by <b>{post.author.firstName}{" "}{post.author.lastName}</b>
                    </PostSmallText>
                    <PostSmallText>
                        {draft ? <>Updated</> : <>Published on</>}{" "}{date}
                    </PostSmallText>
                </PostBody>
            </PostInnerContainer>
        </PostContainer>
    );
}

export default PostComponent;
