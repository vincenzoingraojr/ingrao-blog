import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";

function Index() {
    return (
        <>
            <Head title="Index | ingrao.blog" description="This is the index page of ingrao.blog." />
            <PageLayout content={
                <PageContentLayout content={
                    <>
                        Index
                    </>
                } />
            } />
        </>
    );
}

export default Index;
