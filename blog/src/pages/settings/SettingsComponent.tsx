import { FunctionComponent } from "react";
import SidebarLayout from "../../components/layouts/sublayouts/SidebarLayout";

interface SettingsComponentProps {
    isAdmin: boolean;
    content: JSX.Element;
}


const SettingsComponent: FunctionComponent<SettingsComponentProps> = ({ isAdmin, content }) => {
    const settingsComponentSidebarData = [
        {
            url: "settings/account",
            text: "Account settings",
        },
        {
            url: "settings/delete-account",
            text: "Delete your account",
        },
    ];

    return (
        <SidebarLayout
            sidebarData={settingsComponentSidebarData}
            content={content}
        />
    );
}

export default SettingsComponent;