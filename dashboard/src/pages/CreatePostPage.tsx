import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";

function CreatePostPage() {
    return (
        <>
            <Head
                title="Create a new post | dashboard.ingrao.blog"
                description="In this page you can create a new post and update the existing ones."
            />
            <PageLayout 
                content={
                    <PageContentLayout 
                        content={
                            <>
                                Create a new post.
                            </>
                        }
                    />
                }
            />
        </>
    );
}

export default CreatePostPage;