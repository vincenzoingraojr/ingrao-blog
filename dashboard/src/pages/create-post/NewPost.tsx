import { Form, Formik } from "formik";
import InputField from "../../components/input/InputField";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import {
    DraftPostFeedDocument,
    DraftPostFeedQuery,
    useCreatePostMutation,
    useDraftPostFeedQuery,
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

const NewPostButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function NewPost() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    const { data: draftPostFeedData } = useDraftPostFeedQuery({
        fetchPolicy: "network-only",
    });

    const [createPost] = useCreatePostMutation();

    return (
        <>
            {(loading && !data) || error ? (
                <ModalLoading />
            ) : (
                <ModalContentContainer>
                    <PageTextMB24>
                        Create a new post by entering the slug.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            slug: "",
                        }}
                        onSubmit={async (values, { setErrors, setStatus }) => {
                            const response = await createPost({
                                variables: values,
                                update: (store, { data }) => {
                                    if (
                                        data &&
                                        data.createPost &&
                                        data.createPost.post
                                    ) {
                                        store.writeQuery<DraftPostFeedQuery>({
                                            query: DraftPostFeedDocument,
                                            data: {
                                                draftPostFeed: [
                                                    data.createPost.post,
                                                    ...draftPostFeedData?.draftPostFeed!,
                                                ],
                                            },
                                        });
                                    }
                                },
                            });

                            if (
                                response.data?.createPost?.post &&
                                response.data?.createPost?.errors?.length === 0
                            ) {
                                setStatus(response.data?.createPost?.status);
                            } else {
                                setStatus(null);
                                setErrors(
                                    toErrorMap(
                                        response.data?.createPost?.errors!
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
                                        field="slug"
                                        type="text"
                                        placeholder="Slug"
                                        errors={errors}
                                    />
                                    <PageBlock>
                                        <NewPostButton
                                            type="submit"
                                            title="New post"
                                            role="button"
                                            aria-label="New post"
                                        >
                                            New post
                                        </NewPostButton>
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

export default NewPost;
