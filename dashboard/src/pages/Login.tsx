import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Head from "../components/Head";
import InputField from "../components/input/InputField";
import AuthLayout from "../components/layouts/AuthLayout";
import {
    FieldError,
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
                                        if (data && data.login && data.login.user) {
                                            store.writeQuery<MeQuery>({
                                                query: MeDocument,
                                                data: {
                                                    me: data.login
                                                        .user as User,
                                                },
                                            });
                                        }
                                    },
                                });

                                if (response.data && response.data.login) {
                                    if (
                                        response.data.login.user &&
                                        response.data.login.accessToken && 
                                        response.data.login.accessToken.length > 0
                                    ) {
                                        setAccessToken(
                                            response.data.login.accessToken
                                        );
                                        setStatus(response.data.login.status);
                                        navigate(0);
                                    } else {
                                        if (response.data.login.status && response.data.login.status.length > 0) {
                                            setStatus(response.data.login.status);
                                        } else {
                                            setStatus(null);
                                            setErrors(
                                                toErrorMap(
                                                    response.data.login.errors as FieldError[]
                                                )
                                            );
                                        }
                                    }
                                }
                            }}
                        >
                            {({ errors, status }) => (
                                <Form>
                                    {status && <Status>{status}</Status>}
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
