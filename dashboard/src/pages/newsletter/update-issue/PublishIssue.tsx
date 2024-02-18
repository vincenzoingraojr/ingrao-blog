import { Form, Formik } from "formik";
import ModalLoading from "../../../components/utils/modal/ModalLoading";
import {
    FieldError,
    useFindNewsletterByIdQuery,
    usePublishIssueMutation,
} from "../../../generated/graphql";
import {
    Button,
    FlexContainer24,
    FlexRow24,
    LinkButton,
    ModalContentContainer,
    PageBlock,
    PageTextMB24,
    Status,
} from "../../../styles/global";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Head from "../../../components/Head";
import ErrorComponent from "../../../components/utils/ErrorComponent";

const PublishIssueButton = styled(Button)`
    background-color: #000000;
    color: #ffffff;
`;

const ViewIssueButton = styled(LinkButton)`
    background-color: blue;
    color: #ffffff;
`;

const EditIssueButton = styled(LinkButton)`
    color: #ffffff;
    background-color: blue;
`;

function PublishIssue() {
    const navigate = useNavigate();

    const params = useParams();

    const { data, loading, error } = useFindNewsletterByIdQuery({
        fetchPolicy: "network-only",
        variables: { newsletterId: params.newsletterId },
    });

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findNewsletterById && data.findNewsletterById.draft) {
                console.log("Newsletter issue found.");
            } else {
                navigate("/");
            }
        } else {
            console.log("Loading...");
        }
    }, [navigate, data, loading, error]);

    const [publishIssue] = usePublishIssueMutation();

    const [errors, setErrors] = useState<any>(null);

    return (
        <>
            <Head
                title="Publish this newsletter issue | dashboard.ingrao.blog"
                description="In this page you can publish this newsletter issue."
            />
            {loading ? (
                <ModalLoading />
            ) : (
                <>
                    {data && data.findNewsletterById && !error ? (
                        <ModalContentContainer>
                            <PageTextMB24>
                                Publish this newsletter issue. Before publishing the newsletter issue, make sure
                                that every field is compiled, otherwise you won't be
                                able to publish the issue.
                            </PageTextMB24>
                            <Formik
                                initialValues={{
                                    newsletterId: params.newsletterId!,
                                }}
                                onSubmit={async (values, { setStatus }) => {
                                    const response = await publishIssue({
                                        variables: values,
                                    });

                                    if (response.data && response.data.publishIssue) {
                                        if (
                                            response.data.publishIssue.status && response.data.publishIssue.status.length > 0
                                        ) {
                                            setStatus(response.data.publishIssue.status);
                                            setErrors(null);
                                        } else {
                                            setStatus(null);
                                            setErrors(response.data.publishIssue.errors as FieldError[]);
                                        }
                                    }
                                }}
                            >
                                {({ status }) => (
                                    <Form>
                                        {status && <Status>{status}</Status>}
                                        <FlexContainer24>
                                            {errors &&
                                                errors.map(
                                                    (
                                                        error: {
                                                            field: string;
                                                            message: string;
                                                        },
                                                        i: React.Key | number | null
                                                    ) => (
                                                        <PageBlock key={i}>
                                                            {error.field}:{" "}
                                                            {error.message}.
                                                        </PageBlock>
                                                    )
                                                )}
                                            <FlexRow24>
                                                <PageBlock>
                                                    <PublishIssueButton
                                                        type="submit"
                                                        title="Publish issue"
                                                        role="button"
                                                        aria-label="Publish issue"
                                                    >
                                                        Publish issue
                                                    </PublishIssueButton>
                                                </PageBlock>
                                                {errors && (
                                                    <PageBlock>
                                                        <EditIssueButton
                                                            to={`/newsletter/update-issue/${params.newsletterId}`}
                                                            title="Update issue"
                                                        >
                                                            Update issue
                                                        </EditIssueButton>
                                                    </PageBlock>
                                                )}
                                                {(status && data && data.findNewsletterById) && (
                                                    <PageBlock>
                                                        <ViewIssueButton
                                                            to={`/newsletter/issue/${data.findNewsletterById.newsletterId}`}
                                                            title="View issue"
                                                        >
                                                            View issue
                                                        </ViewIssueButton>
                                                    </PageBlock>
                                                )}
                                            </FlexRow24>
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

export default PublishIssue;
