import { Form, Formik } from "formik";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import AuthLayout from "../components/layouts/AuthLayout";
import { useSendRecoveryEmailMutation } from "../generated/graphql";
import {
    AuthButton,
    AuthForm,
    AuthFormContent,
    AuthFormTitle,
    PageBlock,
    PageTextMB24,
    Status,
} from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";

function RecoverPassword() {
    const [sendEmail] = useSendRecoveryEmailMutation();

    return (
        <>
            <Head
                title="Recover your password | dashboard.ingrao.blog"
                description="Recover your account password in order to log in to the dashboard."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Recover your password</AuthFormTitle>
                        <PageTextMB24>
                            In this page you can recover your account password
                            using the email associated with it.
                        </PageTextMB24>
                        <Formik
                            initialValues={{ email: "", origin: "dash" }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await sendEmail({
                                    variables: values,
                                });

                                if (
                                    response.data?.sendRecoveryEmail.errors
                                        ?.length !== 0
                                ) {
                                    setStatus(null);
                                    setErrors(
                                        toErrorMap(
                                            response.data?.sendRecoveryEmail
                                                .errors!
                                        )
                                    );
                                } else {
                                    setStatus(
                                        response.data.sendRecoveryEmail.status
                                    );
                                }
                            }}
                        >
                            {({ errors, status }) => (
                                <Form>
                                    {status ? <Status>{status}</Status> : null}
                                    <AuthFormContent>
                                        <InputField
                                            field="email"
                                            type="email"
                                            placeholder="Email"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <AuthButton
                                                type="submit"
                                                role="button"
                                                title="Recover your password"
                                                aria-label="Recover your password"
                                            >
                                                Recover your password
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

export default RecoverPassword;
