import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import AuthLayout from "../components/layouts/AuthLayout";
import {
    MeDocument,
    MeQuery,
    useLoginMutation,
    User,
} from "../generated/graphql";
import {
    AuthButton,
    AuthForm,
    AuthFormContent,
    AuthFormTitle,
    PageBlock,
    Status,
} from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";
import { setAccessToken } from "../utils/token";

function Login() {
    const [login] = useLoginMutation();

    const navigate = useNavigate();

    return (
        <>
            <Head
                title="Log in | dashboard.ingrao.blog"
                description="Log in to the dashboard."
            />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Log in</AuthFormTitle>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                origin: "dash",
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
                    </AuthForm>
                }
            />
        </>
    );
}

export default Login;
