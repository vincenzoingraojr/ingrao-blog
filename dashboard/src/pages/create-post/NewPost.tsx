import ModalLoading from "../../components/utils/modal/ModalLoading";
import { useMeQuery } from "../../generated/graphql";

function NewPost() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    return (
        <div>
            {(loading && !data) || error ? <ModalLoading /> : <>New post</>}
        </div>
    );
}

export default NewPost;
