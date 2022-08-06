import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../../styles/devices";
import { PageText } from "../../../styles/global";

interface TabLayoutProps {
    tabData: any;
    content: JSX.Element;
}

const TabLayoutContainer = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-template-rows: 48px auto;
    width: 100%;
    min-height: calc(100vh - 60px);
`;

const TabLayoutHeader = styled.div`
    display: flex;
    position: sticky;
    top: 60px;
    background-color: #ffffff;
    z-index: 100;
    width: 100%;
    height: 48px;
    align-items: center;
    justify-content: flex-start;
`;

const TabLayoutContentContainer = styled.div`
    display: block;
    padding-top: 48px;
    padding-bottom: 48px;
`;

const TabElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 48px;

    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-weight: 400;
        width: 100%;
        height: 48px;
        color: #000000;
        font-size: 18px;
        padding-left: 16px;
        padding-right: 16px;
        border-bottom: 2px solid transparent;
        background-color: transparent;
        transition: background-color ease 0.2s;
    }

    a:hover,
    a:active {
        text-decoration: none;
        background-color: rgba(0, 0, 0, 0.2);
    }

    a.active {
        font-weight: 700;
        color: blue;
        border-bottom: 2px solid blue;
    }
`;

const TabElementText = styled(PageText)`
    font-weight: inherit;
    color: inherit;
`;

export const TabLayoutTitle = styled.div`
    display: block;
    font-weight: 700;
    margin-bottom: 48px;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

const TabLayout: FunctionComponent<TabLayoutProps> = ({ tabData, content }) => {
    return (
        <TabLayoutContainer>
            <TabLayoutHeader>
                {tabData.map((tabElement: any, i: any) => (
                    <TabElement key={i}>
                        <NavLink
                            className={(navData: any) =>
                                navData.isActive ? "active" : ""
                            }
                            to={`/${tabElement.url}`}
                            title={tabElement.text}
                            aria-label={tabElement.text}
                        >
                            <TabElementText>{tabElement.text}</TabElementText>
                        </NavLink>
                    </TabElement>
                ))}
            </TabLayoutHeader>
            <TabLayoutContentContainer>
                {content}
            </TabLayoutContentContainer>
        </TabLayoutContainer>
    );
}

export default TabLayout;