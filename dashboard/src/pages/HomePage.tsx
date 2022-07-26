import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";

function HomePage() {
    return (
        <>
            <Head
                title="Home | dashboard.ingrao.blog"
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
