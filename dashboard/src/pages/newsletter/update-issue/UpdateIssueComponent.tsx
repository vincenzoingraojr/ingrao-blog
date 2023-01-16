import { FunctionComponent } from "react";
import TabLayout from "../../../components/layouts/sublayouts/TabLayout";

interface UpdateIssueComponentProps {
    newsletterId: string;
    content: JSX.Element;
}

const UpdateIssueComponent: FunctionComponent<UpdateIssueComponentProps> = ({
    newsletterId,
    content,
}) => {
    const updateIssueTabs = [
        {
            url: `newsletter/update-issue/${newsletterId}`,
            text: "Update issue",
        },
        {
            url: `newsletter/update-issue/${newsletterId}/preview`,
            text: "Preview",
        },
    ];

    return <TabLayout tabData={updateIssueTabs} content={content} />;
};

export default UpdateIssueComponent;
