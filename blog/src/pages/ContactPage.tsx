import { Form, Formik } from "formik";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";
import { PageTextMB24, WritingContainer } from "../styles/global";

function ContactPage() {
    return (
        <>
            <Head
                title="Contact me | ingrao.blog"
                description="In this page you can find all the methods to contact me."
            />
            <PageLayout content={
                <PageContentLayout content={
                    <StandardPageLayout 
                        title="Contact me"
                        description="In this page you can find all the methods to contact me."
                        content={
                            <>
                                <PageTextMB24>
                                    <WritingContainer>
                                        If you want to contact me, you can reach me out on <a href="https://twitter.com/vincentingraojr" target="_blank" rel="noreferrer noopener" title="My Twitter account" aria-label="My Twitter account">Twitter</a> or send me an email to this email address: <a href="mailto:vincent@ingrao.blog" title="My personal email address" aria-label="My personal email address">vincent@ingrao.blog</a>. Otherwise, you can always fill out the form below — I will answer you as soon as possible.
                                    </WritingContainer>
                                </PageTextMB24>
                                <Formik
                                    
                                >
                                    <Form>

                                    </Form>
                                </Formik>
                            </>
                        }       
                    />
                } />
            } />
        </>
    );
}

export default ContactPage;