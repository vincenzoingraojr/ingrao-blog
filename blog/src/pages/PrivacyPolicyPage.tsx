import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";

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
                            <>
                                Privacy policy
                            </>
                        }       
                    />
                } />
            } />
        </>
    );
}

export default PrivacyPolicyPage;