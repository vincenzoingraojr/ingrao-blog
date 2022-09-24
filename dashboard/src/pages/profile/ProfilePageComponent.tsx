import { FunctionComponent } from "react";
import SidebarLayout from "../../components/layouts/sublayouts/SidebarLayout";

interface ProfilePageComponentProps {
    content: JSX.Element;
}

const ProfilePageComponent: FunctionComponent<ProfilePageComponentProps> = ({
    content,
}) => {
    const profileComponentSidebarData = [
        {
            url: "profile",
            text: "Your profile",
        },
        {
            url: "profile/posts",
            text: "Your posts",
        },
    ];

    return (
        <SidebarLayout
            sidebarData={profileComponentSidebarData}
            content={content}
        />
    );
};

export default ProfilePageComponent;
