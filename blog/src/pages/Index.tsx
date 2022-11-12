import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import styled from "styled-components";

const IndexPageWrapper = styled.div`
    display: block;
    padding-left: 16px;
    padding-right: 16px;
`;

function Index() {
    return (
        <>
            <Head title="Index | ingrao.blog" description="This is the index page of ingrao.blog." />
            <PageLayout content={
                <IndexPageWrapper>
                    Index
                </IndexPageWrapper>
            } />
        </>
    );
}

export default Index;
