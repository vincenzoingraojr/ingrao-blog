import { Form, Formik } from "formik";
import jwtDecode, { JwtHeader, JwtPayload } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import AuthLayout from "../components/layouts/AuthLayout";
import { usePasswordSetupMutation } from "../generated/graphql";
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

function ModifyPassword() {
    const navigate = useNavigate();
    const params = useParams();

    const [passwordSetup] = usePasswordSetupMutation();

    useEffect(() => {
        try {
            const header = jwtDecode<JwtHeader>(params.token!);
            const payload = jwtDecode<JwtPayload>(params.token!);
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
                title="Complete your account | dashboard.ingrao.blog"
                description="Set up your account password in order to log in to the dashboard."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Complete your account</AuthFormTitle>
                        <PageTextMB24>
                            In this page you can set up your account password.
                        </PageTextMB24>
                        <Formik
                            initialValues={{
                                token: params.token!,
                                password: "",
                                confirmPassword: "",
                            }}
                            onSubmit={async (
                                values,
                                { setStatus, setErrors }
                            ) => {
                                const response = await passwordSetup({
                                    variables: values,
                                });

                                const { exp } = jwtDecode<JwtPayload>(
                                    params.token!
                                );

                                if (Date.now() >= exp! * 1000) {
                                    setStatus(
                                        "Your token is expired. Please repeat the password setup operation."
                                    );
                                } else {
                                    if (
                                        response.data?.passwordSetup.errors
                                            ?.length !== 0
                                    ) {
                                        setStatus(null);
                                        setErrors(
                                            toErrorMap(
                                                response.data?.passwordSetup
                                                    .errors!
                                            )
                                        );
                                    } else {
                                        setStatus(
                                            response.data.passwordSetup.status
                                        );
                                    }
                                }
                            }}
                        >
                            {({ status, errors }) => (
                                <Form>
                                    {status ? <Status>{status}</Status> : null}
                                    <AuthFormContent>
                                        <InputField
                                            field="password"
                                            type="password"
                                            placeholder="Password"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="confirmPassword"
                                            type="password"
                                            placeholder="Confirmation password"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <AuthButton
                                                type="submit"
                                                role="button"
                                                title="Modify your password"
                                                aria-label="Modify your password"
                                            >
                                                Set up your password
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

export default ModifyPassword;
