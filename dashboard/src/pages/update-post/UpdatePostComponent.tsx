import { FunctionComponent } from "react";
import { idText } from "typescript";
import TabLayout from "../../components/layouts/sublayouts/TabLayout";

interface UpdatePostComponentProps {
    id: string;
    content: JSX.Element;
}

const UpdatePostComponent: FunctionComponent<UpdatePostComponentProps> = ({
    id,
    content,
}) => {
    const updatePostTabs = [
        {
            url: `update-post/${id}`,
            text: "Update post",
        },
        {
            url: `update-post/${idText}/preview`,
            text: "Preview",
        },
    ];

    return <TabLayout tabData={updatePostTabs} content={content} />;
};

export default UpdatePostComponent;
