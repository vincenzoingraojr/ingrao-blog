import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageText } from "../../../styles/global";

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

    let date = "";

    date = new Date(parseInt(issue.updatedAt)).toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

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
                        Published on {date}, by {issue.author.firstName} {issue.author.lastName}
                    </IssueSmallText>                        
                </SmallIssueBody>
            </SmallIssueInnerContainer>
        </SmallIssueContainer>
    );
};

export default SmallIssueComponent;
