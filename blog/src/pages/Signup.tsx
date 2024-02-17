import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import Head from "../components/Head";
import DatePickerField from "../components/input/datepicker/DatePickerField";
import InputField from "../components/input/InputField";
import SelectField from "../components/input/select/SelectField";
import { FieldError, MeDocument, MeQuery, User, useSignupMutation } from "../generated/graphql";
import { AuthButton, AuthFormContent, AuthHalfInput, ModalContentContainer, PageBlock, PageText, PageTextMB24, Status } from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";
import styled from "styled-components";

const CheckBoxLabel = styled.label`
    display: flex;
    align-items: flex-start;
    align-content: center;
    justify-content: flex-start;
    column-gap: 12px;
    row-gap: 4px;
`;

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
                    Sign up to the blog. Log in{" "}<Link to="/login" title="Log in to the blog" aria-label="Log in to the blog">here</Link>.
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
                        newsletterSubscribed: false,
                    }}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus }
                    ) => {
                        const response = await signup({
                            variables: values,
                            update: (store, { data }) => {
                                if (data && data.signup && data.signup.user) {
                                    store.writeQuery<MeQuery>({
                                        query: MeDocument,
                                        data: {
                                            me: data.signup.user as User,
                                        },
                                    });
                                }
                            },
                        });

                        if (response.data && response.data.signup) {
                            if (response.data.signup.user) {
                                setStatus(response.data.signup.status);
                            } else {
                                setStatus(null);
                                setErrors(
                                    toErrorMap(
                                        response.data.signup.errors as FieldError[]
                                    )
                                );
                            }
                        }
                    }}
                >
                    {({ errors, status }) => (
                        <Form>
                            {status && <Status>{status}</Status>}
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
                                <CheckBoxLabel>
                                    <Field type="checkbox" name="newsletterSubscribed" />
                                    <PageText>By cheking this box, you agree to sign up to the ingrao.blog newsletter.</PageText>
                                </CheckBoxLabel>
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
