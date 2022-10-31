import { Form, Formik } from "formik";
import styled from "styled-components";
import Head from "../../../components/Head";
import DatePickerField from "../../../components/input/datepicker/DatePickerField";
import InputField from "../../../components/input/InputField";
import SelectField from "../../../components/input/select/SelectField";
import ModalLoading from "../../../components/utils/modal/ModalLoading";
import { DashUsersDocument, DashUsersQuery, useAddDashUserMutation, useDashUsersQuery, useMeQuery } from "../../../generated/graphql";
import { Button, FlexContainer24, FlexRow24, ModalContentContainer, PageBlock, PageTextMB24, Status } from "../../../styles/global";
import { toErrorMap } from "../../../utils/toErrorMap";

const AddNewDashUserButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function AddNewUser() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

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

    const roleOptions = [
        { value: "Role", label: "Role" },
        { value: "admin", label: "Admin" },
        { value: "writer", label: "Writer" },
    ];

    const [addUser] = useAddDashUserMutation();

    const { data: dashUsersData } = useDashUsersQuery({
        fetchPolicy: "network-only",
    });

    return (
        <>
            <Head 
                title="Add a new user | dashboard.ingrao.blog"
                description="In this page you can add a new user to the dashboard."
            />
            {(loading && !data) || error ? (
                <ModalLoading />
            ) : (
                <ModalContentContainer>
                    <PageTextMB24>
                        Add a new user to the dashboard.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            email: "",
                            firstName: "",
                            lastName: "",
                            title: "",
                            gender: "",
                            role: "",
                            birthDate: Date(),
                        }}
                        onSubmit={async (values, { setErrors, setStatus }) => {
                            const response = await addUser({
                                variables: values,
                                update: (store, { data }) => {
                                    if (
                                        data &&
                                        data.addDashUser &&
                                        data.addDashUser.user
                                    ) {
                                        store.writeQuery<DashUsersQuery>({
                                            query: DashUsersDocument,
                                            data: {
                                                dashUsers: [
                                                    data.addDashUser.user,
                                                    ...dashUsersData?.dashUsers!,
                                                ],
                                            },
                                        });
                                    }
                                },
                            });

                            if (response.data?.addDashUser?.user || response.data?.addDashUser?.status) {
                                setStatus(response.data.addDashUser.status);
                            } else {
                                setStatus(null);
                                setErrors(
                                    toErrorMap(
                                        response.data?.addDashUser?.errors!
                                    )
                                );
                            }
                        }}
                    >
                        {({ errors, status }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <FlexContainer24>
                                    <FlexRow24>
                                        <DatePickerField
                                            field="birthDate"
                                            placeholder="Birthday"
                                        />
                                        <SelectField
                                            field="role"
                                            placeholder="Role"
                                            errors={
                                                errors
                                            }
                                            options={
                                                roleOptions
                                            }
                                        />
                                    </FlexRow24>
                                    <FlexRow24>
                                        <SelectField
                                            field="title"
                                            placeholder="Title"
                                            errors={
                                                errors
                                            }
                                            options={
                                                titleOptions
                                            }
                                        />
                                        <SelectField
                                            field="gender"
                                            placeholder="Gender"
                                            errors={
                                                errors
                                            }
                                            options={
                                                genderOptions
                                            }
                                        />
                                    </FlexRow24>
                                    <InputField
                                        field="email"
                                        type="email"
                                        placeholder="Email"
                                        errors={
                                            errors
                                        }
                                    />
                                    <InputField
                                        field="firstName"
                                        type="text"
                                        placeholder="First name"
                                        errors={
                                            errors
                                        }
                                    />
                                    <InputField
                                        field="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        errors={
                                            errors
                                        }
                                    />
                                    <PageBlock>
                                        <AddNewDashUserButton
                                            type="submit"
                                            title="Add user"
                                            role="button"
                                            aria-label="Add user"
                                        >
                                            Add user
                                        </AddNewDashUserButton>
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

export default AddNewUser;
