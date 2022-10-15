import { Form, Formik } from "formik";
import ModalLoading from "../../../components/utils/modal/ModalLoading";
import { DashUsersDocument, DashUsersQuery, useDashUsersQuery, useDeleteUserFromDashboardMutation, useFindUserQuery, useMeQuery } from "../../../generated/graphql";
import { Button, FlexContainer24, ModalContentContainer, PageBlock, PageTextMB24, Status } from "../../../styles/global";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Head from "../../../components/Head";

const DeleteUserButton = styled(Button)`
    background-color: red;
    color: #ffffff;
`;

const DeleteStatus = styled(Status)`
    background-color: red;
`;

function DeleteUser() {
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
        } else {
            console.log("Loading...");
        }
    }, [navigate, userData, userLoading, userError]);

    const [deleteUser] = useDeleteUserFromDashboardMutation();

    const { data: dashUsersData } = useDashUsersQuery({
        fetchPolicy: "network-only",
    });

    return (
        <>
            <Head 
                title="Delete user | dashboard.ingrao.blog"
                description="In this page you can delete a user from the dashboard."
            />
            {(loading && !data && !userData) || error ? (
                <ModalLoading />
            ) : (
                <ModalContentContainer>
                    <PageTextMB24>
                        Delete a user from the dashboard.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            id: parseInt(params.id!),
                        }}
                        onSubmit={async (values, { setStatus }) => {
                            const response = await deleteUser({
                                variables: values,
                                update: (store, { data }) => {
                                    if (
                                        data &&
                                        data.deleteUserFromDashboard
                                    ) {
                                        const usersData = dashUsersData?.dashUsers || [];
                                        const selectedUser = usersData.find((item) => item.id === parseInt(params.id!));
                                        const index = usersData.indexOf(selectedUser!);
                                        usersData.splice(index!, 1);
                                        
                                        store.writeQuery<DashUsersQuery>({
                                            query: DashUsersDocument,
                                            data: {
                                                dashUsers: usersData,
                                            },
                                        });
                                    }
                                },
                            });

                            setStatus(response.data?.deleteUserFromDashboard?.status);
                        }}
                    >
                        {({ status }) => (
                            <Form>
                                {status ? <DeleteStatus>{status}</DeleteStatus> : null}
                                <FlexContainer24>
                                    <PageBlock>
                                        <DeleteUserButton
                                            type="submit"
                                            title="Delete user"
                                            role="button"
                                            aria-label="Delete user"
                                        >
                                            Delete user
                                        </DeleteUserButton>
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

export default DeleteUser;
