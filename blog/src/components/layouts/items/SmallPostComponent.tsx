import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageText } from "../../../styles/global";

interface SmallPostComponentProps {
    post: any;
}

const SmallPostContainer = styled.div`
    display: block;
    width: 100%;
    cursor: pointer;
`;

const SmallPostInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const SmallPostImage = styled.div`
    display: block;
    width: 128px;
    height: 128px;

    img {
        width: inherit;
        height: inherit;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
    }
`;

const SmallPostBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SmallPostHeader = styled.div`
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

const SmallPostTitle = styled(PageText)`
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

const SmallPostComponent: FunctionComponent<SmallPostComponentProps> = ({
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
        <SmallPostContainer
            onClick={() => {
                navigate(
                    `/post/${post.slug}`
                );
            }}
            role="link"
            title={post.title}
            aria-label={
                post.title
            }
        >
            <SmallPostInnerContainer>
                <SmallPostImage>
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
                </SmallPostImage>
                <SmallPostBody>
                    <SmallPostHeader>
                        <HeadText>
                            {post.slogan}
                        </HeadText>
                    </SmallPostHeader>
                    <SmallPostTitle>
                        {post.title}
                    </SmallPostTitle>
                    <PostSmallText>
                        Published on {date}, by {post.author.firstName} {post.author.lastName}
                    </PostSmallText>                        
                </SmallPostBody>
            </SmallPostInnerContainer>
        </SmallPostContainer>
    );
};

export default SmallPostComponent;
