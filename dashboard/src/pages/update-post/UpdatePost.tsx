import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Head from "../../components/Head";
import FocusPageLayout from "../../components/layouts/FocusPageLayout";
import { useFindPostQuery } from "../../generated/graphql";
import UpdatePostComponent from "./UpdatePostComponent";

function UpdatePost() {
    const navigate = useNavigate();
    const params = useParams();
    const { data, loading, error } = useFindPostQuery({
        fetchPolicy: "network-only",
        variables: { id: parseInt(params.id!) },
    });

    useEffect(() => {
        if (!loading && !error) {
            if (data && data.findPost) {
                console.log("Post found.");
            } else {
                navigate("/");
            }
        } else {
            console.log("Loading...");
        }
    }, [navigate, data, loading, error]);
    
    return (
        <>
            <Head 
                title="Update a post | dashboard.ingrao.blog"
                description="In this page you can update a post."
            />
            <FocusPageLayout title={`Update post ${params.id}`} 
                content={
                    <UpdatePostComponent id={params.id!} content={
                        <>
                            {params.id}
                        </>
                    } />
                }
            />
        </>
    );
}

export default UpdatePost;

