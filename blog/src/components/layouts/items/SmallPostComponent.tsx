import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageText } from "../../../styles/global";
import { processDate } from "../../../utils/processDate";
import { Post } from "../../../generated/graphql";

interface SmallPostComponentProps {
    post: Post;
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

    const [date, setDate] = useState("");

    useEffect(() => {
        if (post && post.publishedOn) {
            const publishDate = new Date(parseInt(post.publishedOn)).toLocaleString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            if (post.isEdited) {
                const updatedPostDate = processDate(post.updatedAt);
                setDate(`${publishDate}, updated ${updatedPostDate}`);
            } else {
                setDate(publishDate);
            }
        }
    }, [post]);

    return (
        <SmallPostContainer
            onClick={() => {
                navigate(
                    `/post/${post.slug}`
                );
            }}
            role="link"
            title={post.title as string}
            aria-label={
                post.title as string
            }
        >
            <SmallPostInnerContainer>
                <SmallPostImage>
                    <img
                        src={
                            post.postCover as string
                        }
                        title={
                            post.title as string
                        }
                        alt={
                            post.title as string
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
                        {date} | By <b>{post.author.firstName} {post.author.lastName}</b>
                    </PostSmallText>                        
                </SmallPostBody>
            </SmallPostInnerContainer>
        </SmallPostContainer>
    );
};

export default SmallPostComponent;
