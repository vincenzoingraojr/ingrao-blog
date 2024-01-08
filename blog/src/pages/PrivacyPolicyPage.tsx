import { Link } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";
import { WritingContainer } from "../styles/global";

function PrivacyPolicyPage() {
    return (
        <>
            <Head
                title="Privacy policy | ingrao.blog"
                description="In this page you can read the ingrao.blog privacy policy."
            />
            <PageLayout content={
                <PageContentLayout content={
                    <StandardPageLayout 
                        title="Privacy policy"
                        description="In this page you can read the ingrao.blog privacy policy."
                        content={
                            <WritingContainer>
                                <p>
                                    Created on January 8, 2024.
                                </p>
                                <p>
                                    With this document I want to point out how user data is used by <b>ingrao.blog</b>. This website is not using and will never use external analytics services (such as Google Analytics) to measure and acquire user-related information for purposes other than the proper functioning of the website, including IP addresses and device information. This website does not use persistent identifiers or cookies to identify users for advertising purposes, but uses <b>only one cookie</b> for the authentication system.
                                </p>
                                <h2>What kind of data is processed by ingrao.blog?</h2>
                                <p>
                                    Speaking of user data, this website gives users the opportunity to sign up and use certain features dedicated only to registered users. When the user signs up to the website, the following user data is saved in ingrao.blog databases:
                                    <ul>
                                        <li>Full name</li>
                                        <li>Email address</li>
                                        <li>Birthdate</li>
                                        <li>Gender</li>
                                        <li>Title</li>
                                    </ul>
                                    
                                    This data is stored in my databases and storage devices and <b>is not shared with any third party</b>, be it a person or a company. At a later time, the user can upload his/her/its profile image (to complete the profile): again, the user profile image will be saved in the storage devices dedicated to ingrao.blog, and will not be shared with any third party.
                                </p>
                                <p>
                                    If you have questions about user privacy and how data is processed by ingrao.blog, you can send an email to this address: <a href="mailto:info@ingrao.blog" title="Email address dedicated to general issues" aria-label="Email address dedicated to general issues">info@ingrao.blog</a>. Or you can fill in the form on <Link to="/contact" title="Contact page" aria-label="Contact page">this page</Link>.
                                </p>
                            </WritingContainer>
                        }       
                    />
                } />
            } />
        </>
    );
}

export default PrivacyPolicyPage;