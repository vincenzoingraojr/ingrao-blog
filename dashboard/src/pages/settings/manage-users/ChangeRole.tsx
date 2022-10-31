import { Form, Formik } from "formik";
import SelectField from "../../../components/input/select/SelectField";
import ModalLoading from "../../../components/utils/modal/ModalLoading";
import { DashUsersDocument, DashUsersQuery, useChangeRoleMutation, useDashUsersQuery, useFindUserQuery, useMeQuery } from "../../../generated/graphql";
import { Button, FlexContainer24, ModalContentContainer, PageBlock, PageTextMB24, Status } from "../../../styles/global";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toErrorMap } from "../../../utils/toErrorMap";
import Head from "../../../components/Head";

const ChangeRoleButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function ChangeRole() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    const navigate = useNavigate();
    const params = useParams();

    const { data: userData, loading: userLoading, error: userError } = useFindUserQuery({ fetchPolicy: "network-only", variables: { id: parseInt(params.id!) } });

    useEffect(() => {
        if (!userLoading && !userError) {
            if (userData && userData.findUser) {
                console.log("User found.");
            } else {
                navigate("/");
            }
        }
    }, [navigate, userData, userLoading, userError]);

    const roleOptions = [
        { value: "Role", label: "Role" },
        { value: "admin", label: "Admin" },
        { value: "writer", label: "Writer" },
    ];

    const [changeRole] = useChangeRoleMutation();
    
    const { data: dashUsersData } = useDashUsersQuery({
        fetchPolicy: "network-only",
    });

    return (
        <>
            <Head 
                title="Change user role | dashboard.ingrao.blog"
                description="In this page you can change the user role."
            />
            {(loading && !data && !userData) || error ? (
                <ModalLoading />
            ) : (
                <ModalContentContainer>
                    <PageTextMB24>
                        Change the user role.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            id: parseInt(params.id!),
                            role: "",
                        }}
                        onSubmit={async (values, { setErrors, setStatus }) => {
                            const response = await changeRole({
                                variables: values,
                                update: (store, { data }) => {
                                    if (
                                        data &&
                                        data.changeRole &&
                                        data.changeRole.user
                                    ) {
                                        const usersData = dashUsersData?.dashUsers || [];
                                        const selectedUser = usersData.find((item) => item.id === parseInt(params.id!));
                                        const index = usersData.indexOf(selectedUser!);
                                        usersData.splice(index!, 1);
                                        usersData.push(data.changeRole.user);
                                        
                                        store.writeQuery<DashUsersQuery>({
                                            query: DashUsersDocument,
                                            data: {
                                                dashUsers: usersData,
                                            },
                                        });
                                    }
                                },
                            });

                            if (response.data?.changeRole.status) {
                                setStatus(response.data.changeRole.status);
                            } else {
                                setStatus(null);
                                setErrors(toErrorMap(response.data?.changeRole.errors!));
                            }
                        }}
                    >
                        {({ errors, status }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <FlexContainer24>
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
                                    <PageBlock>
                                        <ChangeRoleButton
                                            type="submit"
                                            title="Change user role"
                                            role="button"
                                            aria-label="Change user role"
                                        >
                                            Change role
                                        </ChangeRoleButton>
                                    </PageBlock>
                                </FlexContainer24>
                            </Form>
                        )}
                    </Formik>
                </ModalContentContainer>
            )}
        </>
    )
}

export default ChangeRole;
