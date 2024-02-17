import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import jwtDecode, { JwtHeader, JwtPayload } from "jwt-decode";
import AuthLayout from "../components/layouts/AuthLayout";
import { AuthButton, AuthForm, AuthFormContent, AuthFormTitle, PageBlock, PageTextMB24, Status } from "../styles/global";
import { Form, Formik } from "formik";
import { useVerifyEmailAddressMutation } from "../generated/graphql";

function VerifyEmail() {
    const navigate = useNavigate();
    const params = useParams();

    const [verifyEmail] = useVerifyEmailAddressMutation();

    useEffect(() => {
        try {
            const header = jwtDecode<JwtHeader>(params.token as string);
            const payload = jwtDecode<JwtPayload>(params.token as string);
            if (header && payload) {
                console.log("Valid JWT token");
            }
        } catch (error) {
            navigate("/");
        }
    }, [navigate, params.token]);

    return (
        <>
            <Head
                title="Verify your account | dashboard.ingrao.blog"
                description="Verify the email address linked to your account in order to log in to the dashboard."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Verify your account</AuthFormTitle>
                        <PageTextMB24>
                            In this page you can verify the email address linked to your account.
                        </PageTextMB24>
                        <Formik
                            initialValues={{
                                token: params.token!,
                            }}
                            onSubmit={async (
                                values,
                                { setStatus }
                            ) => {
                                const response = await verifyEmail({
                                    variables: values,
                                });

                                const { exp } = jwtDecode<JwtPayload>(
                                    params.token as string
                                );

                                if (exp && Date.now() >= exp * 1000) {
                                    setStatus(
                                        "Your token is expired. Please repeat the email address verification."
                                    );
                                } else {
                                    if (response.data) {
                                        setStatus(
                                            response.data.verifyEmailAddress
                                                .status
                                        );
                                    }
                                }
                            }}
                        >
                            {({ status }) => (
                                <Form>
                                    {status && <Status>{status}</Status>}
                                    <AuthFormContent>
                                        <PageBlock>
                                            <AuthButton
                                                type="submit"
                                                role="button"
                                                title="Verify your email address"
                                                aria-label="Verify your email address"
                                            >
                                                Verify your email
                                            </AuthButton>
                                        </PageBlock>
                                    </AuthFormContent>
                                </Form>
                            )}
                        </Formik>
                    </AuthForm>
                }
            />
        </>
    );
}

export default VerifyEmail;
