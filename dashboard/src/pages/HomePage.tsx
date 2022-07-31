import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";

function HomePage() {
    return (
        <>
            <Head
                title="Dashboard | ingrao.blog"
                description="This is the dashboard homepage."
            />
            <PageLayout content={<PageContentLayout content={<>Home.</>} />} />
        </>
    );
}

export default HomePage;
