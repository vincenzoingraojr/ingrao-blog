import { Form, Formik } from "formik";
import styled from "styled-components";
import InputField from "../../../components/input/InputField";
import ModalLoading from "../../../components/utils/modal/ModalLoading";
import { useChangePasswordMutation, useMeQuery } from "../../../generated/graphql";
import { Button, FlexContainer24, ModalContentContainer, PageBlock, PageTextMB24, Status } from "../../../styles/global";
import { toErrorMap } from "../../../utils/toErrorMap";

const ChangePasswordButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function ChangePassword() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    const [changePassword] = useChangePasswordMutation();

    return (
        <>
            {(loading && !data) || error ? (
                <ModalLoading />
            ) : (
                <ModalContentContainer>
                    <PageTextMB24>
                        Change the email address linked to your account.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            existingPassword: "",
                            password: "",
                            confirmPassword: "",
                            origin: "dash",
                        }}
                        onSubmit={async (values, { setErrors, setStatus }) => {
                            const response = await changePassword({
                                variables: values,
                            });

                            if (
                                response.data?.changePassword?.status
                            ) {
                                setStatus(response.data?.changePassword?.status);
                            } else {
                                setStatus(null);
                                setErrors(
                                    toErrorMap(
                                        response.data?.changePassword?.errors!
                                    )
                                );
                            }
                        }}
                    >
                        {({ errors, status }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <FlexContainer24>
                                    <InputField
                                        field="existingPassword"
                                        type="password"
                                        placeholder="Existing password"
                                        errors={errors}
                                    />
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
                                        <ChangePasswordButton
                                            type="submit"
                                            title="Change password"
                                            role="button"
                                            aria-label="Change password"
                                        >
                                            Change password
                                        </ChangePasswordButton>
                                    </PageBlock>
                                </FlexContainer24>
                            </Form>
                        )}
                    </Formik>
                </ModalContentContainer>
            )}
        </>
    );
}

export default ChangePassword;
