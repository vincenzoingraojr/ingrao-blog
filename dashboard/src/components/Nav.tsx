import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { PageText } from "../styles/global";
import Add from "./icons/Add";
import Home from "./icons/Home";
import Logo from "./icons/Logo";

const NavContainer = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 92px 48px;
    width: 100%;
    height: 140px;
    padding-left: 16px;
    padding-right: 16px;
`;

const NavTopContainer = styled.div`
    display: flex;
    height: 92px;
    align-items: center;
    justify-content: space-between;
    gap: 36px;
    width: 100%;
`;

const SiteBrand = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 24px;
    }

    a:hover, a:active {
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
    font-size: 28px;
    font-weight: 700;
    text-transform: lowercase;
    color: #000000;

    span {
        color: blue;
    }
`;

const NavInnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
`;

const NavPrimaryContent = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
`;

const NavEntry = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 16px;
        font-weight: 400;
        width: 100%;
        height: 48px;
        color: #000000;
        padding-left: 16px;
        padding-right: 16px;
        border-bottom: 2px solid transparent;
        background-color: transparent;
        transition: background-color ease 0.2s;
    }

    a:hover, a:active {
        text-decoration: none;
        background-color: rgba(0, 0, 0, 0.2);
    }

    a.active {
        font-weight: 700;
        color: blue;
        border-bottom: 2px solid blue;
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
                    <Link to="/home">
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
                                        <Home isActive={isActive ? true : false} />
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
                                        <Add isActive={isActive ? true : false} />
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
};

export default Nav;