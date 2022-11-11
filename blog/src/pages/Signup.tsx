import { Form, Formik } from "formik";
import Head from "../components/Head";
import DatePickerField from "../components/input/datepicker/DatePickerField";
import InputField from "../components/input/InputField";
import SelectField from "../components/input/select/SelectField";
import { MeDocument, MeQuery, User, useSignupMutation } from "../generated/graphql";
import { AuthButton, AuthFormContent, AuthHalfInput, ModalContentContainer, PageBlock, PageTextMB24, Status } from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";

function Signup() {
    const [signup] = useSignupMutation();

    const titleOptions = [
        { value: "Title", label: "Title" },
        { value: "Ms.", label: "Ms." },
        { value: "Mr.", label: "Mr." },
        { value: "Dr.", label: "Dr." },
    ];

    const genderOptions = [
        { value: "Gender", label: "Gender" },
        { value: "Female", label: "Female" },
        { value: "Male", label: "Male" },
        { value: "Non-binary", label: "Non-binary" },
    ];

    return (
        <>
            <Head 
                title="Sign up | ingrao.blog"
                description="In this page you can sign up to the blog."
            />
            <ModalContentContainer>
                <PageTextMB24>
                    Log in to the blog.
                </PageTextMB24>
                <Formik
                    initialValues={{
                        birthDate: Date(),
                        title: "",
                        gender: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                    }}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus }
                    ) => {
                        const response = await signup({
                            variables: values,
                            update: (store, { data }) => {
                                if (data) {
                                    store.writeQuery<MeQuery>({
                                        query: MeDocument,
                                        data: {
                                            me: data.signup
                                                ?.user as User,
                                        },
                                    });
                                }
                            },
                        });

                        if (response.data?.signup?.user) {
                            setStatus(response.data.signup.status);
                        } else {
                            setStatus(null);
                            setErrors(
                                toErrorMap(
                                    response.data?.signup?.errors!
                                )
                            );
                        }
                    }}
                >
                    {({ errors, status }) => (
                        <Form>
                            {status ? <Status>{status}</Status> : null}
                            <AuthFormContent>
                                <DatePickerField
                                    field="birthDate"
                                    placeholder="Birthday"
                                />
                                <AuthHalfInput>
                                    <SelectField
                                        field="title"
                                        placeholder="Title"
                                        errors={errors}
                                        options={titleOptions}
                                    />
                                    <SelectField
                                        field="gender"
                                        placeholder="Gender"
                                        errors={errors}
                                        options={genderOptions}
                                    />
                                </AuthHalfInput>
                                <AuthHalfInput>
                                    <InputField
                                        field="firstName"
                                        type="text"
                                        placeholder="First name"
                                        errors={errors}
                                    />
                                    <InputField
                                        field="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        errors={errors}
                                    />
                                </AuthHalfInput>
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
                                        title="Sign up"
                                        role="button"
                                        aria-label="Sign up"
                                    >
                                        Sign up
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

export default Signup;
