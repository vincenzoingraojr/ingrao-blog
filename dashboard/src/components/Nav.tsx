import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { PageText } from "../styles/global";
import Add from "./icons/Add";
import Home from "./icons/Home";
import Logo from "./icons/Logo";

const NavContainer = styled.div`
    display: grid;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 100;
    grid-template-columns: auto;
    grid-template-rows: 60px;
    width: 100%;
    height: 60px;
    padding-left: 16px;
    padding-right: 16px;

    @media ${devices.tablet} {
        grid-template-rows: 92px 48px;
        height: 140px;
    }
`;

const NavTopContainer = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    gap: 36px;
    width: 100%;

    @media ${devices.tablet} {
        height: 92px;
    }
`;

const SiteBrand = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 16px;
    }

    a:hover,
    a:active {
        text-decoration: none;
    }
`;

const SiteBrandIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SiteBrandText = styled.div`
    display: block;
    font-size: 26px;
    font-weight: 700;
    text-transform: lowercase;
    color: #000000;

    span {
        color: blue;
    }
`;

const NavInnerContainer = styled.div`
    display: block;
    height: auto;

    @media ${devices.tablet} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 48px;
    }
`;

const NavPrimaryContent = styled.nav`
    display: flex;
    position: fixed;
    align-items: center;
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #c0c0c0;
    justify-content: space-evenly;
    height: 60px;
    z-index: 100;

    @media ${devices.tablet} {
        position: relative;
        top: unset;
        left: unset;
        right: unset;
        bottom: unset;
        justify-content: flex-start;
        height: 48px;
        background-color: transparent;
    }
`;

const NavEntry = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-weight: 400;
        width: 100%;
        height: 60px;
        color: #000000;
        font-size: 14px;
        padding-left: 16px;
        padding-right: 16px;
        border-bottom: none;
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
        border-bottom: none;
    }

    @media ${devices.tablet} {
        width: auto;
        height: 48px;

        a {
            flex-direction: row;
            justify-content: flex-start;
            height: 48px;
            gap: 16px;
            font-size: 18px;
            border-bottom: 2px solid transparent;
        }

        a.active {
            border-bottom: 2px solid blue;
        }
    }
`;

const NavEntryIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavEntryText = styled(PageText)`
    font-weight: inherit;
    color: inherit;
`;

function Nav() {
    return (
        <NavContainer>
            <NavTopContainer>
                <SiteBrand>
                    <Link
                        to="/home"
                        title="ingrao.blog"
                        aria-label="ingrao.blog"
                    >
                        <SiteBrandIcon>
                            <Logo type="logo" />
                        </SiteBrandIcon>
                        <SiteBrandText>
                            ingrao<span>.blog</span>
                        </SiteBrandText>
                    </Link>
                </SiteBrand>
            </NavTopContainer>
            <NavInnerContainer>
                <NavPrimaryContent>
                    <NavEntry>
                        <NavLink
                            className={(navData: any) =>
                                navData.isActive ? "active" : ""
                            }
                            to="/home"
                            title="Home"
                            aria-label="Home"
                        >
                            {({ isActive }) => (
                                <>
                                    <NavEntryIcon>
                                        <Home
                                            isActive={isActive ? true : false}
                                        />
                                    </NavEntryIcon>
                                    <NavEntryText>Home</NavEntryText>
                                </>
                            )}
                        </NavLink>
                    </NavEntry>
                    <NavEntry>
                        <NavLink
                            className={(navData: any) =>
                                navData.isActive ? "active" : ""
                            }
                            to="/create-post"
                            title="Create a new post"
                            aria-label="Create a new post"
                        >
                            {({ isActive }) => (
                                <>
                                    <NavEntryIcon>
                                        <Add
                                            isActive={isActive ? true : false}
                                        />
                                    </NavEntryIcon>
                                    <NavEntryText>Create post</NavEntryText>
                                </>
                            )}
                        </NavLink>
                    </NavEntry>
                </NavPrimaryContent>
            </NavInnerContainer>
        </NavContainer>
    );
}

export default Nav;
