import { FunctionComponent } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import { ControlContainer } from "../../styles/global";
import Back from "../icons/Back";

interface FocusPageLayoutProps {
    title: string;
    content: JSX.Element;
}

const FocusPageLayoutWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const FocusPageLayoutContainer = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-template-rows: 60px auto;
    width: 100%;

    @media ${devices.mobileL} {
        width: 86vw;
    }

    @media ${devices.tablet} {
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

const FocusPageHeader = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    gap: 16px;
    width: 100%;
    z-index: 10000;
    overflow: hidden;
    background-color: #ffffff;
`;

const FocusPageHeaderText = styled.div`
    display: block;
    font-weight: 700;
    width: calc(100% - 52px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const FocusPageLayoutContent = styled.div`
    display: block;
    padding-left: 16px;
    padding-right: 16px;
`;

const FocusPageLayout: FunctionComponent<FocusPageLayoutProps> = ({
    title,
    content,
}) => {
    const navigate = useNavigate();
    const navigationType = useNavigationType();

    return (
        <FocusPageLayoutWrapper>
            <FocusPageLayoutContainer>
                <FocusPageHeader>
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
                        <Back />
                    </ControlContainer>
                    <FocusPageHeaderText>{title}</FocusPageHeaderText>
                </FocusPageHeader>
                <FocusPageLayoutContent>{content}</FocusPageLayoutContent>
            </FocusPageLayoutContainer>
        </FocusPageLayoutWrapper>
    );
};

export default FocusPageLayout;
