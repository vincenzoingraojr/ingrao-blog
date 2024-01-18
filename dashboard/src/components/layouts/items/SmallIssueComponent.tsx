import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDeleteIssueMutation, useUnpublishIssueMutation } from "../../../generated/graphql";
import newsletterCover from "../../../images/cover.svg";
import { PageText, TextButton } from "../../../styles/global";
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

const UnpublishIssueButton = styled(TextButton)`
    color: #000000;
`;

const SmallIssueComponent: FunctionComponent<SmallIssueComponentProps> = ({
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
    const [unpublishIssue] = useUnpublishIssueMutation();

    return (
        <SmallIssueContainer
            onClick={() => {
                navigate(
                    issue.draft ? `/newsletter/update-issue/${issue.newsletterId}` : `/newsletter/issue/${issue.newsletterId}`
                );
            }}
            role="link"
            title={`${issue.title}`}
            aria-label={`${issue.title}`}
        >
            <SmallIssueInnerContainer>
                <SmallIssueImage>
                    <img
                        src={
                            issue.newsletterCover !== null && issue.newsletterCover !== ""
                                ? issue.newsletterCover
                                : newsletterCover
                        }
                        title={
                            issue.draft
                                ? `Unpublished newsletter issue (${issue.id}) cover image`
                                : `${issue.title}`
                        }
                        alt={
                            issue.draft
                                ? `Unpublished newsletter issue (${issue.id}) cover`
                                : `${issue.title}`
                        }
                    />
                </SmallIssueImage>
                <SmallIssueBody>
                    <SmallIssueHeader>
                        <HeadText>
                            {issue.draft ? (
                                <>Unpublished newsletter issue: {issue.id}</>
                            ) : (
                                <>{issue.subject}</>
                            )}
                        </HeadText>
                    </SmallIssueHeader>
                    <SmallIssueTitle>
                        {issue.title}
                    </SmallIssueTitle>
                    <IssueSmallText>
                        {issue.draft && <>Updated</>} {date} | By <b>{issue.author.firstName} {issue.author.lastName}</b>
                    </IssueSmallText>
                    <IssueButtonsContainer>
                        {issue.draft ? (
                            <ViewIssueButton
                                type="button"
                                role="button"
                                title="View issue"
                                aria-label="View issue"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/newsletter/update-issue/${issue.newsletterId}/preview`);
                                }}
                            >
                                View issue
                            </ViewIssueButton>
                        ) : (
                            <UnpublishIssueButton
                                type="button"
                                role="button"
                                title="Unpublish issue"
                                aria-label="Unpublish issue"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    unpublishIssue({
                                        variables: {
                                            id: issue.id,
                                        },
                                    }).then(() => {
                                        navigate(0);
                                    });
                                }}
                            >
                                Unpublish issue
                            </UnpublishIssueButton>
                        )}
                        <DeleteIssueButton
                            type="button"
                            role="button"
                            title="Delete issue"
                            aria-label="Delete issue"
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
                            Delete Issue
                        </DeleteIssueButton>
                    </IssueButtonsContainer>
                </SmallIssueBody>
            </SmallIssueInnerContainer>
        </SmallIssueContainer>
    );
};

export default SmallIssueComponent;
