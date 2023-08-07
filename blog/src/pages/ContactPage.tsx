import { Form, Formik } from "formik";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";
import { Button, FlexContainer24, PageBlock, PageTextMB24, Status, WritingContainer } from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";
import styled from "styled-components";
import { useSendMessageMutation } from "../generated/graphql";

const ContactButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function ContactPage() {
    const [sendMessage] = useSendMessageMutation();
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
                                    initialValues={{
                                        name: "",
                                        email: "",
                                        subject: "",
                                        message: "",
                                    }}
                                    onSubmit={async (
                                        values,
                                        { setErrors, setStatus }
                                    ) => {
                                        const response = await sendMessage({
                                            variables: values,
                                        });
                                        
                                        if (response.data?.sendMessage?.status) {
                                            setStatus(response.data.sendMessage.status);
                                        } else {
                                            setStatus(null);
                                            setErrors(
                                                toErrorMap(
                                                    response.data?.sendMessage?.errors!
                                                )
                                            );
                                        }
                                    }}
                                >
                                    {({ errors, status }) => (
                                        <Form id="contact_form">
                                            {status ? <Status>{status}</Status> : null}
                                            <FlexContainer24>
                                                <InputField
                                                    field="name"
                                                    type="text"
                                                    placeholder="Full name"
                                                    errors={errors}
                                                />
                                                <InputField
                                                    field="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    errors={errors}
                                                />
                                                <InputField
                                                    field="subject"
                                                    type="text"
                                                    placeholder="Subject"
                                                    errors={errors}
                                                />
                                                <InputField
                                                    field="message"
                                                    type="textarea"
                                                    placeholder="Message"
                                                    errors={errors}
                                                />
                                                <PageBlock>
                                                    <ContactButton
                                                        type="submit"
                                                        title="Send message"
                                                        role="button"
                                                        aria-label="Send message"
                                                    >
                                                        Send message
                                                    </ContactButton>
                                                </PageBlock>
                                            </FlexContainer24>
                                        </Form>
                                    )}
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