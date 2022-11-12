import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import styled from "styled-components";
import { useBlogFeedQuery } from "../generated/graphql";
import { devices } from "../styles/devices";
import { LoadingContainer } from "../styles/global";
import LoadingComponent from "../components/utils/LoadingComponent";
import { Link } from "react-router-dom";

const IndexPageWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    min-height: calc(100vh - 140px);

    @media ${devices.tablet} {
        min-height: calc(100vh - 172px);
    }
`;

const IndexContainer = styled.div`
    display: block;
    height: calc(100vh - 140px);
    width: 100%;
    background-color: #ffffff;

    @media ${devices.tablet} {
        height: calc(100vh - 172px);
    }
`;

const IndexItemContainer = styled.div`
    display: grid;
    height: calc(100vh - 140px);
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px; 

    @media ${devices.tablet} {
        height: calc(100vh - 172px);
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
`;

const IndexItemImageContainer = styled.div`
    display: block;
    height: calc(100vh - 220px);
    width: 100%;
    grid-area: 1 / 1 / 2 / 2;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media ${devices.tablet} {
        height: calc(100vh - 172px);
        grid-area: 1 / 1 / 3 / 2;
    }
`;

const IndexItemInfoContainer = styled.div`
    display: block;
    height: calc(100vh - 220px);
    width: 100%;
    grid-area: 1 / 2 / 2 / 3; 

    @media ${devices.tablet} {
        height: calc(100vh - 252px);
    }
`;

const IndexItemInfoBox = styled.div`
    display: block;
    height: calc(100vh - 220px);
    width: 100%;
    padding-top: 24px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 24px;
    overflow: auto;

    @media ${devices.tablet} {
        padding-left: 24px;
        padding-right: 24px;
        height: calc(100vh - 252px);
    }
`;

const IndexItemSlogan = styled.div`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 4px solid #000000;
    margin-bottom: 16px;
`;

const IndexItemTitle = styled.div`
    display: block;

    a {
        font-weight: 700;
        color: black;
        font-size: 32px;
        text-decoration: none;
    }

    a:hover, a:active {
        text-decoration: underline;
    }

    @media ${devices.tablet} {
        a {
            font-size: 44px;
        }
    }
`;

const CommandModule = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    background-color: transparent;
    grid-area: 2 / 1 / 3 / 3;
    height: 80px;

    @media ${devices.tablet} {
        background-color: #c0c0c0;
        grid-area: 2 / 2 / 3 / 3;
    }
`;

function Index() {
    const { data, loading, error } = useBlogFeedQuery({ fetchPolicy: "cache-and-network" });
    
    return (
        <>
            <Head title="Index | ingrao.blog" description="This is the index page of ingrao.blog." />
            <PageLayout content={
                <IndexPageWrapper>
                    {(loading && !data) || error ? (
                        <LoadingContainer>
                            <LoadingComponent />
                        </LoadingContainer>
                    ) : (
                        <IndexContainer>
                            <IndexItemContainer>
                                <IndexItemImageContainer>
                                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/1024px-The_Blue_Marble_%28remastered%29.jpg"} title={"Earth"} alt={"Earth"} />
                                </IndexItemImageContainer>
                                <IndexItemInfoContainer>
                                    <IndexItemInfoBox>
                                        <IndexItemSlogan>
                                            Slogan
                                        </IndexItemSlogan>
                                        <IndexItemTitle>
                                            <Link to={`/post/1`} title={"Title"} aria-label={"Title"}>
                                                Title
                                            </Link>
                                        </IndexItemTitle>
                                    </IndexItemInfoBox>
                                </IndexItemInfoContainer>
                                <CommandModule>
                                    Commands
                                </CommandModule>
                            </IndexItemContainer>
                        </IndexContainer>
                    )}
                </IndexPageWrapper>
            } />
        </>
    );
}

export default Index;
