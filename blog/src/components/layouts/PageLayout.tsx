import { FunctionComponent } from "react";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import { PageText } from "../../styles/global";
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
        width: 86vw;
    }

    @media ${devices.tablet} {
        grid-template-rows: 92px auto;
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
    min-height: calc(100vh - 140px);

    @media ${devices.tablet} {
        min-height: calc(100vh - 172px);
    }
`;

const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 80px;
    border-top: 2px solid #000000;
    font-size: 14px;
    column-gap: 12px;
    row-gap: 4px;
    margin-left: 16px;
    margin-right: 16px;
`;

const FooterItem = styled(PageText)`
    display: block;
    text-rendering: optimizeLegibility;
`;

const PageLayout: FunctionComponent<PageLayoutProps> = ({ content }) => {
    return (
        <PageLayoutWrapper>
            <PageLayoutContainer>
                <Nav />
                <PageLayoutContent>{content}</PageLayoutContent>
                <FooterContainer>
                    <FooterItem>
                        &copy; {new Date().getFullYear()} ingrao.blog
                    </FooterItem>
                    <FooterItem>
                        <a
                            href="/privacy-policy"
                            target="_blank"
                            title="Privacy policy of ingrao.blog"
                            rel="noreferrer"
                            aria-label="Privacy policy of ingrao.blog"
                        >
                            Privacy policy
                        </a>
                    </FooterItem>
                    <FooterItem>
                        <a
                            href="https://twitter.com/vincentingraojr"
                            target="_blank"
                            title="Vincenzo Ingrao Jr.'s official Twitter account"
                            rel="noreferrer"
                            aria-label="Vincenzo Ingrao Jr.'s official Twitter account"
                        >
                            Twitter
                        </a>
                    </FooterItem>
                </FooterContainer>
            </PageLayoutContainer>
        </PageLayoutWrapper>
    );
};

export default PageLayout;
