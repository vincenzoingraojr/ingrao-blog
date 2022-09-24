import { FunctionComponent } from "react";
import Arrow from "../icons/Arrow";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import Logo from "../icons/Logo";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import { ControlContainer, PageBlock, PageTextMT48 } from "../../styles/global";

interface AuthLayoutProps {
    content: JSX.Element;
}

const AuthPage = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-template-rows: 60px auto;
`;

const AuthPageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: sticky;
    top: 0;
    height: 60px;
    width: 100%;
    z-index: 100;
    background-color: #ffffff;
    padding-left: 12px;
    padding-right: 12px;

    @media ${devices.mobileL} {
        padding-left: 32px;
        padding-right: 32px;
    }

    @media ${devices.tablet} {
        padding-left: 10%;
        padding-right: 10%;
    }

    @media ${devices.laptopS} {
        padding-left: 20%;
        padding-right: 20%;
    }

    @media ${devices.laptopM} {
        padding-left: 26%;
        padding-right: 26%;
    }

    @media ${devices.desktop} {
        padding-left: 28%;
        padding-right: 28%;
    }
`;

const AuthPageLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 36px);
    padding-right: 36px;
`;

const AuthPageContentContainer = styled.div`
    display: block;
    margin-top: 48px;
    padding-bottom: 84px;
    padding-left: 24px;
    padding-right: 24px;

    @media ${devices.mobileS} {
        padding-left: 32px;
        padding-right: 32px;
    }

    @media ${devices.mobileL} {
        padding-left: 14%;
        padding-right: 14%;
    }

    @media ${devices.tablet} {
        padding-left: 16%;
        padding-right: 16%;
    }

    @media ${devices.laptopS} {
        padding-left: 24%;
        padding-right: 24%;
    }

    @media ${devices.laptopM} {
        padding-left: 30%;
        padding-right: 30%;
    }

    @media ${devices.desktop} {
        padding-left: 32%;
        padding-right: 32%;
    }
`;

const AuthPageContent = styled.div`
    display: block;
`;

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ content }) => {
    const navigate = useNavigate();
    const navigationType = useNavigationType();

    let showLoginOption = true;

    if (window.location.pathname === "/login") {
        showLoginOption = false;
    }

    return (
        <AuthPage>
            <AuthPageHeader>
                <ControlContainer
                    title="Go back"
                    role="button"
                    aria-label="Go back"
                    onClick={() => {
                        if (navigationType === "POP") {
                            navigate("/");
                        } else {
                            navigate(-1);
                        }
                    }}
                >
                    <Arrow />
                </ControlContainer>
                <AuthPageLogo>
                    <Link to="/" title="ingrao.blog" aria-label="ingrao.blog">
                        <Logo type="inline" />
                    </Link>
                </AuthPageLogo>
            </AuthPageHeader>
            <AuthPageContentContainer>
                <AuthPageContent>{content}</AuthPageContent>
                <PageTextMT48>
                    {showLoginOption ? (
                        <PageBlock>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                title="Log in"
                                aria-label="Log in to the dashboard"
                            >
                                Log in
                            </Link>
                        </PageBlock>
                    ) : (
                        <PageBlock>
                            Forgot your password?{" "}
                            <Link
                                to="/recover-password"
                                title="Recover your password"
                                aria-label="Recover your password"
                            >
                                Recover it here
                            </Link>
                        </PageBlock>
                    )}
                </PageTextMT48>
            </AuthPageContentContainer>
        </AuthPage>
    );
};

export default AuthLayout;
