import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";
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
                                {(loading && !data) || error ? (
                                    <LoadingContainer>
                                        <LoadingComponent />
                                    </LoadingContainer>
                                ) : (
                                    <SearchBoxComponent
                                        data={data?.blogFeed}
                                    />
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