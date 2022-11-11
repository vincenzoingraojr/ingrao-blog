import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import { MeDocument, MeQuery, useLoginMutation, User } from "../generated/graphql";
import { AuthButton, AuthFormContent, ModalContentContainer, PageBlock, PageTextMB24, Status } from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";
import { setAccessToken } from "../utils/token";

function Login() {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    return (
        <>
            <Head 
                title="Log in | ingrao.blog"
                description="In this page you can log in to the blog."
            />
            <ModalContentContainer>
                <PageTextMB24>
                    Log in to the blog. Forgot your password?{" "}<Link to="/recover-password" title="Recover your password" aria-label="Recover your password">Recover it here</Link>
                </PageTextMB24>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        origin: "blog",
                    }}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus }
                    ) => {
                        const response = await login({
                            variables: values,
                            update: (store, { data }) => {
                                if (data) {
                                    store.writeQuery<MeQuery>({
                                        query: MeDocument,
                                        data: {
                                            me: data.login
                                                ?.user as User,
                                        },
                                    });
                                }
                            },
                        });

                        if (
                            response.data?.login?.user &&
                            response.data.login.errors?.length === 0 &&
                            response.data.login.accessToken
                        ) {
                            setAccessToken(
                                response.data.login.accessToken!
                            );
                            setStatus(response.data.login.status);
                            navigate(0);
                        } else {
                            if (response.data?.login?.status) {
                                setStatus(response.data.login.status);
                            } else {
                                setStatus(null);
                                setErrors(
                                    toErrorMap(
                                        response.data?.login?.errors!
                                    )
                                );
                            }
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
                                <InputField
                                    field="password"
                                    type="password"
                                    placeholder="Password"
                                    errors={errors}
                                />
                                <PageBlock>
                                    <AuthButton
                                        type="submit"
                                        title="Log in"
                                        role="button"
                                        aria-label="Log in"
                                    >
                                        Log in
                                    </AuthButton>
                                </PageBlock>
                            </AuthFormContent>
                        </Form>
                    )}
                </Formik>
            </ModalContentContainer>
        </>
    );
}

export default Login;
