import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageText } from "../../../styles/global";

interface PostComponentProps {
    post: any;
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
    justify-content: flex-start;
`;

const HeadText = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 4px solid #000000;
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

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`;

const PostSmallText = styled(PageText)`
    font-size: 16px;
`;

const PostComponent: FunctionComponent<PostComponentProps> = ({
    post,
}) => {
    const navigate = useNavigate();

    let date = "";
    date = new Date(parseInt(post.updatedAt)).toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <PostContainer
            onClick={() => {
                navigate(`/post/${post.slug}`);
            }}
            role="link"
            title={post.title}
            aria-label={post.title}
        >
            <PostInnerContainer>
                <PostHeader>
                    <HeadText>
                        {post.slogan}
                    </HeadText>
                </PostHeader>
                <PostImage>
                    <img
                        src={
                            post.postCover
                        }
                        title={
                            post.title
                        }
                        alt={
                            post.title
                        }
                    />
                </PostImage>
                <PostBody>
                    <PostTitle>
                        {post.title}
                    </PostTitle>
                        <PageText>{post.description}</PageText>
                    <PostSmallText>
                        Written by{" "}
                        <b>
                            {post.author.firstName} {post.author.lastName}
                        </b>
                    </PostSmallText>
                    <PostSmallText>
                        Published on {date}
                    </PostSmallText>
                </PostBody>
            </PostInnerContainer>
        </PostContainer>
    );
};

export default PostComponent;
