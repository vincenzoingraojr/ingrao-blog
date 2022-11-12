import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";
import SearchBoxComponent from "../components/utils/SearchBox";
import { useBlogFeedQuery } from "../generated/graphql";

function SearchPage() {
    const { data } = useBlogFeedQuery({ fetchPolicy: "cache-and-network" });
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
                                <SearchBoxComponent
                                    data={data?.blogFeed}
                                />
                            </>
                        }       
                    />
                } />
            } />
        </>
    );
}

export default SearchPage;