import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../../styles/devices";
import { PageText } from "../../../styles/global";

interface SidebarLayoutProps {
    sidebarData: {
        url: string;
        text: string;
    }[];
    content: JSX.Element;
}

const SidebarLayoutContainer = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    column-gap: 0px;
    row-gap: 48px;
    width: 100%;

    @media ${devices.tablet} {
        grid-template-columns: 25% auto;
        grid-template-rows: auto;
        column-gap: 24px;
        row-gap: 0px;
    }
`;

const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    position: relative;
    top: unset;
    height: auto;

    @media ${devices.tablet} {
        position: sticky;
        top: 188px;
        height: calc(100vh - 340px);
    }
`;

const SidebarElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-weight: 400;
        width: 100%;
        color: #000000;
        font-size: 18px;
        padding-top: 8px;
        padding-left: 8px;
        padding-right: 8px;
        padding-bottom: 8px;
        border-left: 4px solid transparent;
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
        border-left: 4px solid blue;
    }
`;

const SidebarElementText = styled(PageText)`
    font-weight: inherit;
    color: inherit;
`;

const SidebarLayoutContentContainer = styled.div`
    display: block;
`;

export const SidebarLayoutTitle = styled.div`
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

const SidebarLayout: FunctionComponent<SidebarLayoutProps> = ({
    sidebarData,
    content,
}) => {
    return (
        <SidebarLayoutContainer>
            <SidebarContainer>
                {sidebarData.map(
                    (
                        sidebarDataElement: { url: string; text: string },
                        i: number
                    ) => (
                        <SidebarElement key={i}>
                            <NavLink
                                className={(navData: any) =>
                                    navData.isActive ? "active" : ""
                                }
                                to={`/${sidebarDataElement.url}`}
                                title={sidebarDataElement.text}
                                aria-label={sidebarDataElement.text}
                                end
                            >
                                <SidebarElementText>
                                    {sidebarDataElement.text}
                                </SidebarElementText>
                            </NavLink>
                        </SidebarElement>
                    )
                )}
            </SidebarContainer>
            <SidebarLayoutContentContainer>
                {content}
            </SidebarLayoutContentContainer>
        </SidebarLayoutContainer>
    );
};

export default SidebarLayout;
