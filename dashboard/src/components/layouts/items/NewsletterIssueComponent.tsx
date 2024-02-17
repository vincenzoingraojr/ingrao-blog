import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Newsletter, useDeleteIssueMutation } from "../../../generated/graphql";
import newsletterCover from "../../../images/cover.svg";
import { PageText, TextButton } from "../../../styles/global";
import { processDate } from "../../../utils/processDate";

interface IssueComponentProps {
    issue: Newsletter;
}

const IssueContainer = styled.div`
    display: block;
    width: 100%;
    cursor: pointer;
`;

const IssueInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const IssueHeader = styled.div`
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

const IssueImage = styled.div`
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

const IssueBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const IssueTitle = styled(PageText)`
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

const IssueButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 16px;
    column-gap: 12px;
    row-gap: 4px;
`;

const ViewIssueButton = styled(TextButton)`
    color: blue;
`;

const DeleteIssueButton = styled(TextButton)`
    color: red;
`;

const NewsletterIssueComponent: FunctionComponent<IssueComponentProps> = ({
    issue,
}) => {
    const navigate = useNavigate();

    let date = "";

    if (issue.draft) {
        date = processDate(issue.updatedAt);
    } else {
        const publishDate = new Date(parseInt(issue.createdAt)).toLocaleString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });

        if (issue.isEdited) {
            const updatedIssueDate = processDate(issue.updatedAt);
            date = publishDate + ", updated " + updatedIssueDate;
        } else {
            date = publishDate;
        }
    }

    const [deleteIssue] = useDeleteIssueMutation();

    return (
        <IssueContainer
            onClick={() => {
                navigate(
                    issue.draft ? `/newsletter/update-issue/${issue.newsletterId}` : `/newsletter/issue/${issue.newsletterId}`
                );
            }}
            role="link"
            title={issue.title as string}
            aria-label={
                issue.title as string
            }
        >
            <IssueInnerContainer>
                <IssueHeader>
                    <HeadText>
                        {issue.draft ? (
                            <>Unpublished issue: {issue.id}</>
                        ) : (
                            <>{issue.subject}</>
                        )}
                    </HeadText>
                </IssueHeader>
                <IssueImage>
                    <img
                        src={
                            issue.newsletterCover !== null && issue.newsletterCover !== ""
                                ? issue.newsletterCover
                                : newsletterCover
                        }
                        title={issue.title as string}
                        alt={issue.title as string}
                    />
                </IssueImage>
                <IssueBody>
                    <IssueTitle>
                        {issue.title}
                    </IssueTitle>
                    <IssueSmallText>
                        Written by{" "}
                        <b>
                            {issue.author.firstName} {issue.author.lastName}
                        </b>
                    </IssueSmallText>
                    <IssueSmallText>
                        {issue.draft && <>Updated</>} {date}
                    </IssueSmallText>
                    {issue.draft && (
                        <IssueButtonsContainer>
                            <ViewIssueButton
                                type="button"
                                role="button"
                                title="View newsletter issue"
                                aria-label="View newsletter issue"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/newsletter/update-issue/${issue.newsletterId}/preview`);
                                }}
                            >
                                View issue
                            </ViewIssueButton>
                            <DeleteIssueButton
                                type="button"
                                role="button"
                                title="Delete post"
                                aria-label="Delete post"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteIssue({
                                        variables: {
                                            id: issue.id,
                                        },
                                    }).then(() => {
                                        navigate(0);
                                    });
                                }}
                            >
                                Delete issue
                            </DeleteIssueButton>
                        </IssueButtonsContainer>
                    )}
                </IssueBody>
            </IssueInnerContainer>
        </IssueContainer>
    );
};

export default NewsletterIssueComponent;
