import { Form, Formik } from "formik";
import InputField from "../../components/input/InputField";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import {
    DashNewsletterFeedDocument,
    DashNewsletterFeedQuery,
    DraftNewsletterFeedDocument,
    DraftNewsletterFeedQuery,
    FieldError,
    useCreateIssueMutation,
    useDashNewsletterFeedQuery,
    useDraftNewsletterFeedQuery,
    useMeQuery,
} from "../../generated/graphql";
import {
    Button,
    FlexContainer24,
    ModalContentContainer,
    PageBlock,
    PageTextMB24,
    Status,
} from "../../styles/global";
import styled from "styled-components";
import { toErrorMap } from "../../utils/toErrorMap";
import ErrorComponent from "../../components/utils/ErrorComponent";

const NewIssueButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function NewIssue() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    const { data: draftNewsletterFeedData } = useDraftNewsletterFeedQuery({
        fetchPolicy: "network-only",
    });

    const { data: dashNewsletterFeedData } = useDashNewsletterFeedQuery({ fetchPolicy: "network-only" });

    const [createIssue] = useCreateIssueMutation();

    return (
        <>
            {loading ? (
                <ModalLoading />
            ) : (
                <>
                    {data && data.me && !error ? (
                        <ModalContentContainer>
                            <PageTextMB24>
                                Create a new issue by entering the title.
                            </PageTextMB24>
                            <Formik
                                initialValues={{
                                    title: "",
                                }}
                                onSubmit={async (values, { setErrors, setStatus }) => {
                                    const response = await createIssue({
                                        variables: values,
                                        update: (store, { data }) => {
                                            if (
                                                data &&
                                                data.createIssue &&
                                                data.createIssue.issue
                                            ) {
                                                if (draftNewsletterFeedData && draftNewsletterFeedData.draftNewsletterFeed) {
                                                    store.writeQuery<DraftNewsletterFeedQuery>({
                                                        query: DraftNewsletterFeedDocument,
                                                        data: {
                                                            draftNewsletterFeed: [
                                                                data.createIssue.issue,
                                                                ...draftNewsletterFeedData.draftNewsletterFeed,
                                                            ],
                                                        },
                                                    });
                                                }
        
                                                if (dashNewsletterFeedData && dashNewsletterFeedData.dashNewsletterFeed) {
                                                    store.writeQuery<DashNewsletterFeedQuery>({
                                                        query: DashNewsletterFeedDocument,
                                                        data: {
                                                            dashNewsletterFeed: [
                                                                data.createIssue.issue,
                                                                ...dashNewsletterFeedData.dashNewsletterFeed,
                                                            ],
                                                        },
                                                    });
                                                }
                                            }
                                        },
                                    });
        
                                    if (response.data) {
                                        if (
                                            response.data.createIssue.issue
                                        ) {
                                            setStatus(response.data.createIssue.status);
                                        } else {
                                            setStatus(null);
                                            setErrors(
                                                toErrorMap(
                                                    response.data.createIssue.errors as FieldError[]
                                                )
                                            );
                                        }
                                    }
                                }}
                            >
                                {({ errors, status }) => (
                                    <Form>
                                        {status && <Status>{status}</Status>}
                                        <FlexContainer24>
                                            <InputField
                                                field="title"
                                                type="text"
                                                placeholder="Title"
                                                errors={errors}
                                            />
                                            <PageBlock>
                                                <NewIssueButton
                                                    type="submit"
                                                    title="New issue"
                                                    role="button"
                                                    aria-label="New issue"
                                                >
                                                    New issue
                                                </NewIssueButton>
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

export default NewIssue;
