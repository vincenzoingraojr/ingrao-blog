import { FunctionComponent } from "react";
import SidebarLayout from "../../components/layouts/sublayouts/SidebarLayout";

interface NewsletterComponentProps {
    isAdmin: boolean;
    content: JSX.Element;
}


const NewsletterComponent: FunctionComponent<NewsletterComponentProps> = ({ isAdmin, content }) => {
    const newsletterComponentSidebarData = [
        {
            url: "newsletter",
            text: "Dashboard",
        },
        {
            url: "newsletter/issues",
            text: "Your issues",
        },
    ];

    const adminNewsletterComponentSidebarData = [
        {
            url: "newsletter",
            text: "Dashboard",
        },
        {
            url: "newsletter/issues",
            text: "All issues",
        },
        {
            url: "newsletter/users",
            text: "Subscribed users",
        },
    ];

    return (
        <SidebarLayout
            sidebarData={isAdmin ? adminNewsletterComponentSidebarData : newsletterComponentSidebarData}
            content={content}
        />
    );
}

export default NewsletterComponent;