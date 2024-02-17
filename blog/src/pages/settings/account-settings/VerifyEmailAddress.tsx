import { Form, Formik } from "formik";
import styled from "styled-components";
import ModalLoading from "../../../components/utils/modal/ModalLoading";
import { useVerifyEmailAddressMutation, useMeQuery } from "../../../generated/graphql";
import jwtDecode, { JwtHeader, JwtPayload } from "jwt-decode";
import { Button, FlexContainer24, ModalContentContainer, PageBlock, PageTextMB24, Status } from "../../../styles/global";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Head from "../../../components/Head";
import ErrorComponent from "../../../components/utils/ErrorComponent";

const VerifyEmailAddressButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function VerifyEmailAddress() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "blog" },
    });

    const navigate = useNavigate();
    const params = useParams();

    const [verifyEmail] = useVerifyEmailAddressMutation();

    useEffect(() => {
        try {
            const header = jwtDecode<JwtHeader>(params.token as string);
            const payload = jwtDecode<JwtPayload>(params.token as string);
            if (header && payload) {
                console.log("Valid JWT token");
            }
        } catch (error) {
            navigate("/");
        }
    }, [navigate, params.token]);

    return (
        <>
            <Head 
                title="Verify your email address | ingrao.blog"
                description="In this page you can verify your email address."
            />
            {loading ? (
                <ModalLoading />
            ) : (
                <>
                    {data && data.me && !error ? (
                        <ModalContentContainer>
                            <PageTextMB24>
                                Verify the email address linked to your account.
                            </PageTextMB24>
                            <Formik
                                initialValues={{
                                    token: params.token!,
                                }}
                                onSubmit={async (
                                    values,
                                    { setStatus }
                                ) => {
                                    const response = await verifyEmail({
                                        variables: values,
                                    });
        
                                    const { exp } = jwtDecode<JwtPayload>(
                                        params.token!
                                    );
        
                                    if (exp && Date.now() >= exp * 1000) {
                                        setStatus(
                                            "Your token is expired. Please repeat the email address verification."
                                        );
                                    } else {
                                        if (response.data) {
                                            setStatus(
                                                response.data.verifyEmailAddress
                                                    .status
                                            );
                                        }
                                    }
                                }}
                            >
                                {({ status }) => (
                                    <Form>
                                        {status ? <Status>{status}</Status> : null}
                                        <FlexContainer24>
                                            <PageBlock>
                                                <VerifyEmailAddressButton
                                                    type="submit"
                                                    title="Verify email address"
                                                    role="button"
                                                    aria-label="Verify email address"
                                                >
                                                    Verify email address
                                                </VerifyEmailAddressButton>
                                            </PageBlock>
                                        </FlexContainer24>
                                    </Form>
                                )}
                            </Formik>
                        </ModalContentContainer>
                    ) : (
                        <ErrorComponent />
                    )}
                </>
            )}
        </>
    );
}

export default VerifyEmailAddress;
