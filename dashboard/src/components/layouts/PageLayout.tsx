import { FunctionComponent } from "react";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import Nav from "../Nav";

interface PageLayoutProps {
    content: JSX.Element;
}

const PageLayoutWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const PageLayoutContainer = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-template-rows: 60px auto;
    width: 100%;

    @media ${devices.mobileL} {
        width: 90vw;
    }

    @media ${devices.tablet} {
        grid-template-rows: 140px auto;
        width: 78vw;
    }

    @media ${devices.laptopM} {
        width: 72vw;
    }

    @media ${devices.laptopL} {
        width: 64vw;
    }

    @media ${devices.desktop} {
        width: 56vw;
    }
`;

const PageLayoutContent = styled.div`
    display: block;
`;

const PageLayout: FunctionComponent<PageLayoutProps> = ({ content }) => {
    return (
        <PageLayoutWrapper>
            <PageLayoutContainer>
                <Nav />
                <PageLayoutContent>
                    {content}
                </PageLayoutContent>
            </PageLayoutContainer>
        </PageLayoutWrapper>
    );
};

export default PageLayout;