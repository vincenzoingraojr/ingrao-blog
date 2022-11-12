import { Link } from "react-router-dom";
import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";
import { WritingContainer } from "../styles/global";

function NotFoundPage() {
    return (
        <>
            <Head
                title="404: Page not found | ingrao.blog"
                description="The page you are looking for does not exist."
            />
            <PageLayout content={
                <PageContentLayout content={
                    <StandardPageLayout 
                        title="404"
                        description="The page you are looking for does not exist."
                        content={
                            <WritingContainer>
                                <p>
                                    The page you are looking for does not exist. Go <Link to="/" title="Go home" aria-label="Go home">home</Link> or <Link to="/search" title="Search for a blog post" aria-label="Search for a blog post">search</Link> for a blog post.
                                </p>
                            </WritingContainer>
                        }       
                    />
                } />
            } />
        </>
    );
}

export default NotFoundPage;