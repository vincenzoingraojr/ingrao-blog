import { Form, Formik } from "formik";
import jwtDecode, { JwtHeader, JwtPayload } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import AuthLayout from "../components/layouts/AuthLayout";
import { useNotAuthModifyPasswordMutation } from "../generated/graphql";
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

    const [modifyPassword] = useNotAuthModifyPasswordMutation();

    useEffect(() => {
        try {
            if (params.token) {
                const header = jwtDecode<JwtHeader>(params.token as string);
                const payload = jwtDecode<JwtPayload>(params.token as string);
                if (header && payload) {
                    console.log("Valid JWT token");
                }
            }
        } catch (error) {
            navigate("/");
        }
    }, [navigate, params.token]);

    return (
        <>
            <Head
                title="Modify your password | ingrao.blog"
                description="Modify your account password in order to log in to the blog."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Modify your password</AuthFormTitle>
                        <PageTextMB24>
                            In this page you can modify your account password.
                        </PageTextMB24>
                        <Formik
                            initialValues={{
                                token: params.token || "",
                                password: "",
                                confirmPassword: "",
                            }}
                            onSubmit={async (
                                values,
                                { setStatus, setErrors }
                            ) => {
                                const response = await modifyPassword({
                                    variables: values,
                                });

                                const { exp } = jwtDecode<JwtPayload>(
                                    params.token as string
                                );

                                if (exp && Date.now() >= exp * 1000) {
                                    setStatus(
                                        "Your token is expired. Please repeat the password recovery operation."
                                    );
                                } else {
                                    if (response.data) {
                                        if (
                                            response.data.notAuthModifyPassword.errors && response.data.notAuthModifyPassword.errors.length > 0
                                        ) {
                                            setStatus(null);
                                            setErrors(
                                                toErrorMap(
                                                    response.data.notAuthModifyPassword.errors
                                                )
                                            );
                                        } else {
                                            setStatus(
                                                response.data.notAuthModifyPassword
                                                    .status
                                            );
                                        }   
                                    }
                                }
                            }}
                        >
                            {({ status, errors }) => (
                                <Form>
                                    {status && <Status>{status}</Status>}
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
                                                Modify your password
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
