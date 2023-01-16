import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { ControlContainer, PageText } from "../styles/global";
import Add from "./icons/Add";
import Home from "./icons/Home";
import Logo from "./icons/Logo";
import profilePicture from "../images/profile-picture.svg";
import { useMeQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import Close from "./icons/Close";
import Arrow from "./icons/Arrow";
import Mail from "./icons/Mail";

const NavContainer = styled.div`
    display: grid;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 10000;
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
        align-items: stretch;
        justify-content: flex-start;
        height: 48px;
        border-bottom: 2px solid black;
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
            border-bottom: 4px solid transparent;
        }

        a.active {
            border-bottom: 4px solid blue;
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

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    cursor: pointer;
`;

const ProfileInfoContainer = styled.div`
    display: none;

    @media ${devices.tablet} {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
`;

const ProfileName = styled.div`
    display: block;
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
    text-align: right;

    &:hover {
        text-decoration: underline;
    }
`;

const ProfileRole = styled(PageText)`
    text-align: right;
    font-size: 16px;
    text-transform: capitalize;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 21px;

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
        object-fit: cover;
        object-position: center;
    }
`;

const MenuOuterContainer = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    background-color: #ffffff;
    overflow: auto;
`;

const MenuContainer = styled.div`
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

const MenuNav = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    z-index: 10001;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    gap: 36px;
    width: 100%;
    background-color: #ffffff;
    padding-left: 16px;
    padding-right: 16px;

    @media ${devices.tablet} {
        height: 92px;
    }
`;

const MenuBrandIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuContentContainer = styled.div`
    display: block;
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 48px;
`;

const MenuTitle = styled.div`
    display: block;
    margin-bottom: 48px;
    font-weight: 700;
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

const MenuContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const MenuDirectionContainer = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const MenuDirectionEntry = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    a {
        display: flex;
        gap: 10px;
        text-decoration: none;
    }

    a:hover,
    a:active {
        text-decoration: none;
    }
`;

const MenuDirectionEntryIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(180deg);
    transform-origin: center;
`;

const MenuDirectionEntryText = styled(PageText)`
    font-weight: 700;
    font-size: 24px;
    color: #000000;
    border-bottom: 2px solid transparent;

    &:hover,
    &:active {
        color: #000000;
        border-bottom: 2px solid blue;
    }

    a.active & {
        color: #000000;
        border-bottom: 2px solid blue;
    }
`;

function Nav() {
    const { data } = useMeQuery({
        fetchPolicy: "cache-and-network",
        variables: { origin: "dash" },
    });

    const [menu, setMenu] = useState(false);

    useEffect(() => {
        if (menu) {
            document.body.classList.add("not-scrolling");
        } else {
            document.body.classList.remove("not-scrolling");
        }
    }, [menu]);

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
                <ProfileContainer
                    title="Open menu"
                    role="button"
                    aria-label="Open menu"
                    onClick={() => {
                        setMenu(true);
                        document.body.classList.add("not-scrolling");
                    }}
                >
                    <ProfileInfoContainer>
                        <ProfileName>
                            {data?.me?.firstName} {data?.me?.lastName}
                        </ProfileName>
                        <ProfileRole>{data?.me?.role}</ProfileRole>
                    </ProfileInfoContainer>
                    <ProfileImageContainer>
                        <img
                            src={
                                data?.me?.profilePicture !== "" &&
                                data?.me?.profilePicture !== null
                                    ? data?.me?.profilePicture!
                                    : profilePicture
                            }
                            title={`${data?.me?.firstName}'s profile picture`}
                            alt={`${data?.me?.firstName} ${data?.me?.lastName}`}
                        />
                    </ProfileImageContainer>
                </ProfileContainer>
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
                    <NavEntry>
                        <NavLink
                            className={(navData: any) =>
                                navData.isActive ? "active" : ""
                            }
                            to="/newsletter"
                            title="Manage the newsletter"
                            aria-label="Manage the newsletter"
                        >
                            {({ isActive }) => (
                                <>
                                    <NavEntryIcon>
                                        <Mail
                                            isActive={isActive ? true : false}
                                        />
                                    </NavEntryIcon>
                                    <NavEntryText>Newsletter</NavEntryText>
                                </>
                            )}
                        </NavLink>
                    </NavEntry>
                </NavPrimaryContent>
            </NavInnerContainer>
            {menu && (
                <MenuOuterContainer>
                    <MenuContainer>
                        <MenuNav>
                            <MenuBrandIcon>
                                <Logo type="logo" />
                            </MenuBrandIcon>
                            <ControlContainer
                                title="Close menu"
                                role="button"
                                aria-label="Close menu"
                                onClick={() => {
                                    setMenu(false);
                                    document.body.classList.remove(
                                        "not-scrolling"
                                    );
                                }}
                            >
                                <Close type="normal" />
                            </ControlContainer>
                        </MenuNav>
                        <MenuContentContainer>
                            <MenuTitle>Menu</MenuTitle>
                            <MenuContent>
                                <MenuDirectionContainer>
                                    <MenuDirectionEntry>
                                        <NavLink
                                            className={(navData: any) =>
                                                navData.isActive ? "active" : ""
                                            }
                                            to="/profile"
                                            title="Go to your profile"
                                            aria-label="Go to your profile"
                                        >
                                            <MenuDirectionEntryIcon>
                                                <Arrow color="blue" />
                                            </MenuDirectionEntryIcon>
                                            <MenuDirectionEntryText>
                                                Profile
                                            </MenuDirectionEntryText>
                                        </NavLink>
                                    </MenuDirectionEntry>
                                    <MenuDirectionEntry>
                                        <NavLink
                                            className={(navData: any) =>
                                                navData.isActive ? "active" : ""
                                            }
                                            to="/settings/account"
                                            title="Go to the account settings page"
                                            aria-label="Go to the account settings page"
                                        >
                                            <MenuDirectionEntryIcon>
                                                <Arrow color="blue" />
                                            </MenuDirectionEntryIcon>
                                            <MenuDirectionEntryText>
                                                Account settings
                                            </MenuDirectionEntryText>
                                        </NavLink>
                                    </MenuDirectionEntry>
                                    {data?.me?.role === "admin" && (
                                        <>
                                            <MenuDirectionEntry>
                                                <NavLink
                                                    className={(navData: any) =>
                                                        navData.isActive ? "active" : ""
                                                    }
                                                    to="/settings/manage-users"
                                                    title="Manage users"
                                                    aria-label="Manage users"
                                                >
                                                    <MenuDirectionEntryIcon>
                                                        <Arrow color="blue" />
                                                    </MenuDirectionEntryIcon>
                                                    <MenuDirectionEntryText>
                                                        Manage users
                                                    </MenuDirectionEntryText>
                                                </NavLink>
                                            </MenuDirectionEntry>
                                            <MenuDirectionEntry>
                                                <NavLink
                                                    className={(navData: any) =>
                                                        navData.isActive ? "active" : ""
                                                    }
                                                    to="/settings/manage-posts"
                                                    title="Manage posts"
                                                    aria-label="Manage posts"
                                                >
                                                    <MenuDirectionEntryIcon>
                                                        <Arrow color="blue" />
                                                    </MenuDirectionEntryIcon>
                                                    <MenuDirectionEntryText>
                                                        Manage posts
                                                    </MenuDirectionEntryText>
                                                </NavLink>
                                            </MenuDirectionEntry>
                                        </>
                                    )}
                                    <MenuDirectionEntry>
                                        <NavLink
                                            to="/logout"
                                            title="Log out"
                                            aria-label="Log out"
                                        >
                                            <MenuDirectionEntryIcon>
                                                <Arrow color="blue" />
                                            </MenuDirectionEntryIcon>
                                            <MenuDirectionEntryText>
                                                Log out
                                            </MenuDirectionEntryText>
                                        </NavLink>
                                    </MenuDirectionEntry>
                                </MenuDirectionContainer>
                            </MenuContent>
                        </MenuContentContainer>
                    </MenuContainer>
                </MenuOuterContainer>
            )}
        </NavContainer>
    );
}

export default Nav;
