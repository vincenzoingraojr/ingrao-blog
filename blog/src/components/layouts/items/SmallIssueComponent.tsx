import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageText } from "../../../styles/global";
import { processDate } from "../../../utils/processDate";

interface SmallIssueComponentProps {
    issue: any;
}

const SmallIssueContainer = styled.div`
    display: block;
    width: 100%;
    cursor: pointer;
`;

const SmallIssueInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const SmallIssueImage = styled.div`
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

const SmallIssueBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SmallIssueHeader = styled.div`
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

const SmallIssueTitle = styled(PageText)`
    font-weight: 700;
    font-size: 24px;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`;

const IssueSmallText = styled(PageText)`
    font-size: 16px;
`;

const SmallIssueComponent: FunctionComponent<SmallIssueComponentProps> = ({
    issue,
}) => {
    const navigate = useNavigate();

    const [date, setDate] = useState("");

    useEffect(() => {
        if (issue) {
            const publishDate = new Date(parseInt(issue.createdAt)).toLocaleString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            if (issue.isEdited) {
                const updatedIssueDate = processDate(issue.updatedAt);
                setDate(`${publishDate}, updated ${updatedIssueDate}`);
            } else {
                setDate(publishDate);
            }
        }
    }, [issue]);

    return (
        <SmallIssueContainer
            onClick={() => {
                navigate(
                    `/newsletter/issue/${issue.newsletterId}`
                );
            }}
            role="link"
            title={issue.title}
            aria-label={
                issue.title
            }
        >
            <SmallIssueInnerContainer>
                <SmallIssueImage>
                    <img
                        src={
                            issue.newsletterCover
                        }
                        title={
                            issue.title
                        }
                        alt={
                            issue.title
                        }
                    />
                </SmallIssueImage>
                <SmallIssueBody>
                    <SmallIssueHeader>
                        <HeadText>
                            {issue.subject}
                        </HeadText>
                    </SmallIssueHeader>
                    <SmallIssueTitle>
                        {issue.title}
                    </SmallIssueTitle>
                    <IssueSmallText>
                        {date} | By <b>{issue.author.firstName} {issue.author.lastName}</b>
                    </IssueSmallText>                        
                </SmallIssueBody>
            </SmallIssueInnerContainer>
        </SmallIssueContainer>
    );
};

export default SmallIssueComponent;
