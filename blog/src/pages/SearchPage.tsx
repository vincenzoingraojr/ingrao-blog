import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";
import ErrorComponent from "../components/utils/ErrorComponent";
import LoadingComponent from "../components/utils/LoadingComponent";
import SearchBoxComponent from "../components/utils/SearchBox";
import { useBlogFeedQuery } from "../generated/graphql";
import { LoadingContainer } from "../styles/global";

function SearchPage() {
    const { data, loading, error } = useBlogFeedQuery({ fetchPolicy: "cache-and-network" });
    return (
        <>
            <Head
                title="Search for a blog post | ingrao.blog"
                description="In this page you can search for a blog post."
            />
            <PageLayout content={
                <PageContentLayout content={
                    <StandardPageLayout 
                        title="Search"
                        description="In this page you can search for a blog post."
                        content={
                            <>
                                {loading ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <>
                                        {(data && !error) ? (
                                            <SearchBoxComponent
                                                data={data.blogFeed}
                                                type="post"
                                            />
                                        ) : (
                                            <ErrorComponent />
                                        )}
                                    </>
                                )}
                            </>
                        }       
                    />
                } />
            } />
        </>
    );
}

export default SearchPage;