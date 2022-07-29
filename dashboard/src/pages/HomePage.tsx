import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";

function HomePage() {
    return (
        <>
            <Head
                title="Dashboard | ingrao.blog"
                description="This is the dashboard homepage."
            />
            <PageLayout 
                content={
                    <>
                        Home.
                    </>
                }
            />
        </>
    );
}

export default HomePage;
