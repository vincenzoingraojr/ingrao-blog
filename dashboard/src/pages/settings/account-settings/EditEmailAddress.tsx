import { Form, Formik } from "formik";
import styled from "styled-components";
import InputField from "../../../components/input/InputField";
import ModalLoading from "../../../components/utils/modal/ModalLoading";
import { useEditEmailAddressMutation, useMeQuery } from "../../../generated/graphql";
import { Button, FlexContainer24, ModalContentContainer, PageBlock, PageTextMB24, Status } from "../../../styles/global";
import { toErrorMap } from "../../../utils/toErrorMap";

const EditEmailAddressButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function EditEmailAddress() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    const [editEmail] = useEditEmailAddressMutation();

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
                            email: "",
                            confirmEmail: "",
                            origin: "dash",
                        }}
                        onSubmit={async (values, { setErrors, setStatus }) => {
                            const response = await editEmail({
                                variables: values,
                            });

                            if (
                                response.data?.editEmailAddress?.status
                            ) {
                                setStatus(response.data?.editEmailAddress?.status);
                            } else {
                                setStatus(null);
                                setErrors(
                                    toErrorMap(
                                        response.data?.editEmailAddress?.errors!
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
                                        field="email"
                                        type="email"
                                        placeholder="Email"
                                        errors={errors}
                                    />
                                    <InputField
                                        field="confirmEmail"
                                        type="email"
                                        placeholder="Confirmation email"
                                        errors={errors}
                                    />
                                    <PageBlock>
                                        <EditEmailAddressButton
                                            type="submit"
                                            title="Edit email address"
                                            role="button"
                                            aria-label="Edit email address"
                                        >
                                            Edit email address
                                        </EditEmailAddressButton>
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

export default EditEmailAddress;