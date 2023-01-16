import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { ControlContainer, PageText } from "../styles/global";
import Logo from "./icons/Logo";
import profilePicture from "../images/profile-picture.svg";
import { useMeQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import Close from "./icons/Close";
import Arrow from "./icons/Arrow";
import More from "./icons/More";
import Magnifier from "./icons/Magnifier";

const NavContainer = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 10000;
    width: 100%;
    height: 60px;
    padding-left: 16px;
    padding-right: 16px;

    @media ${devices.tablet} {
        height: 92px;
    }
`;

const NavInnerContainer = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border-bottom: 2px solid #000000;
    width: 100%;

    @media ${devices.tablet} {
        height: 92px;
        gap: 24px;
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

const NavOptionsContainer = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
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

const ProfileEmail = styled(PageText)`
    text-align: right;
    font-size: 16px;
    text-transform: lowercase;
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
        variables: { origin: "blog" },
    });

    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);

    useEffect(() => {
        if (menu) {
            document.body.classList.add("not-scrolling");
        } else {
            document.body.classList.remove("not-scrolling");
        }
    }, [menu]);

    const location = useLocation();

    return (
        <NavContainer>
            <NavInnerContainer>
                <SiteBrand>
                    <Link
                        to="/"
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
                <NavOptionsContainer>
                    <ControlContainer
                        title="Search for a blog post"
                        role="link"
                        aria-label="Search for a blog post"
                        onClick={() => {
                            navigate("/search");
                        }}
                    >
                        <Magnifier type="normal" />
                    </ControlContainer>
                    {data && data.me && (
                        <ProfileContainer
                            title="Your profile"
                            role="link"
                            aria-label="Your profile"
                            onClick={() => {
                                navigate("/profile");
                            }}
                        >
                            <ProfileInfoContainer>
                                <ProfileName>
                                    {data?.me?.firstName} {data?.me?.lastName}
                                </ProfileName>
                                <ProfileEmail>{data?.me?.email}</ProfileEmail>
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
                    )}
                    <ControlContainer
                        title="Open menu"
                        role="button"
                        aria-label="Open menu"
                        onClick={() => {
                            setMenu(true);
                            document.body.classList.add("not-scrolling");
                        }}
                    >
                        <More />
                    </ControlContainer>
                </NavOptionsContainer>
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
                                    {data && data.me ? (
                                        <>
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
                                                <MenuDirectionEntry>
                                                    <a
                                                        href="https://dashboard.ingrao.blog"
                                                        title="Go to the dashboard"
                                                        aria-label="Go to the dashboard"
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >
                                                        <MenuDirectionEntryIcon>
                                                            <Arrow color="blue" />
                                                        </MenuDirectionEntryIcon>
                                                        <MenuDirectionEntryText>
                                                            Go to the dashboard
                                                        </MenuDirectionEntryText>
                                                    </a>
                                                </MenuDirectionEntry>
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
                                        </>
                                    ) : (
                                        <>
                                            <MenuDirectionEntry>
                                                <NavLink
                                                    className={(navData: any) =>
                                                        navData.isActive ? "active" : ""
                                                    }
                                                    to="/login"
                                                    state={{
                                                        backgroundLocation: location,
                                                    }}
                                                    title="Log in to the blog"
                                                    aria-label="Log in to the blog"
                                                >
                                                    <MenuDirectionEntryIcon>
                                                        <Arrow color="blue" />
                                                    </MenuDirectionEntryIcon>
                                                    <MenuDirectionEntryText>
                                                        Log in
                                                    </MenuDirectionEntryText>
                                                </NavLink>
                                                <Outlet />
                                            </MenuDirectionEntry>
                                            <MenuDirectionEntry>
                                                <NavLink
                                                    className={(navData: any) =>
                                                        navData.isActive ? "active" : ""
                                                    }
                                                    to="/signup"
                                                    state={{
                                                        backgroundLocation: location,
                                                    }}
                                                    title="Sign up to the blog"
                                                    aria-label="Sign up to the blog"
                                                >
                                                    <MenuDirectionEntryIcon>
                                                        <Arrow color="blue" />
                                                    </MenuDirectionEntryIcon>
                                                    <MenuDirectionEntryText>
                                                        Sign up
                                                    </MenuDirectionEntryText>
                                                </NavLink>
                                                <Outlet />
                                            </MenuDirectionEntry>
                                        </>
                                    )}
                                    <MenuDirectionEntry>
                                        <NavLink
                                            to="/about"
                                            title="About me"
                                            aria-label="About me"
                                        >
                                            <MenuDirectionEntryIcon>
                                                <Arrow color="blue" />
                                            </MenuDirectionEntryIcon>
                                            <MenuDirectionEntryText>
                                                About
                                            </MenuDirectionEntryText>
                                        </NavLink>
                                    </MenuDirectionEntry>
                                    <MenuDirectionEntry>
                                        <NavLink
                                            to="/contact"
                                            title="Contact me"
                                            aria-label="Contact me"
                                        >
                                            <MenuDirectionEntryIcon>
                                                <Arrow color="blue" />
                                            </MenuDirectionEntryIcon>
                                            <MenuDirectionEntryText>
                                                Contact
                                            </MenuDirectionEntryText>
                                        </NavLink>
                                    </MenuDirectionEntry>
                                    <MenuDirectionEntry>
                                        <NavLink
                                            to="/newsletter"
                                            title="ingrao.blog newsletter"
                                            aria-label="ingrao.blog newsletter"
                                        >
                                            <MenuDirectionEntryIcon>
                                                <Arrow color="blue" />
                                            </MenuDirectionEntryIcon>
                                            <MenuDirectionEntryText>
                                                Newsletter
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
