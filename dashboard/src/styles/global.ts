import { Link } from "react-router-dom";
import styled from "styled-components";
import { devices } from "./devices";

export const Button = styled.button`
    display: block;
    border: none;
    background-color: inherit;
    color: inherit;
    padding: 12px 24px;
    font-weight: 700;
    border-radius: 0;
    text-transform: uppercase;
    cursor: pointer;
`;

export const TextButton = styled.button`
    display: block;
    border: none;
    background-color: transparent;
    padding: 0;
    color: inherit;
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`;

export const PageBlock = styled.div`
    display: block;
`;

export const PageText = styled.div`
    display: block;
    text-align: left;
`;

export const PageTextMT24 = styled(PageText)`
    margin-top: 24px;
`;

export const PageTextMB24 = styled(PageText)`
    margin-bottom: 24px;
`;

export const PageTextMT48 = styled(PageText)`
    margin-top: 48px;
`;

export const PageTextMB48 = styled(PageText)`
    margin-bottom: 48px;
`;

export const SvgIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    fill: inherit;
    stroke: inherit;

    svg {
        width: inherit;
        height: inherit;
        fill: inherit;
        stroke: inherit;
    }
`;

export const AuthForm = styled.div`
    display: block;
`;

export const AuthFormTitle = styled.div`
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

export const AuthFormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Status = styled.div`
    display: block;
    padding: 6px;
    font-size: 14px;
    background-color: blue;
    color: #ffffff;
    margin-bottom: 24px;
`;

export const AuthHalfInput = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: unset;

    @media ${devices.mobileS} {
        flex-direction: column;
        align-items: unset;
    }

    @media ${devices.mobileL} {
        flex-direction: row;
        align-items: flex-end;
    }
`;

export const AuthButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

export const CustomFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

export const CustomFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

export const CustomFieldContainer = styled.div`
    display: block;
    background-color: transparent;
    border: 2px solid #000000;
    height: 64px;
    padding-left: 12px;
    padding-right: 12px;
`;

export const CustomInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: 4px;
    margin-bottom: 4px;
`;

export const CustomInfo = styled.div`
    display: block;
    font-size: 14px;
`;

export const CustomInnerFieldContainer = styled.div`
    display: flex;
    align-items: center;
    height: 26px;
    width: 100%;
    margin-bottom: 4px;
`;

export const ImageButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

export const LinkButton = styled(Link)`
    display: inline-flex;
    gap: 24px;
    padding: 12px 24px;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    background-color: inherit;
    color: inherit;
    font-weight: 700;
    text-transform: uppercase;

    &:hover,
    &:active {
        text-decoration: none;
    }
`;

export const LinkButtonText = styled.div`
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
    text-transform: inherit;
`;

export const LoadingContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 42px;
`;

export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

export const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const OptionTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 24px;
`;

export const ModalContentContainer = styled.div`
    display: block;
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

export const FlexContainer24 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const FlexRow24 = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
`;

export const ControlContainer = styled.div.attrs(
    (props: { size?: number }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: ${(props) => (props.size ? `${props.size}px` : `36px`)};
    height: ${(props) => (props.size ? `${props.size}px` : `36px`)};
    border-radius: 9999px;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: #c0c0c0;
    }
`;

export const PostFormContainer = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto;

    @media ${devices.tablet} {
        grid-template-columns: 600px auto;
    }
`;

export const CoverImageContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: #151414;
    width: 100%;
    height: 360px;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

    img {
        width: 100%;
        height: 360px;
        opacity: 0.6;
        object-fit: cover;
        object-position: center;
    }
`;

export const CoverImageButtonsContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    z-index: 1000;
`;

export const UploadCoverImageButton = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;

    input[type="file"] {
        position: absolute;
        width: 40px;
        height: 40px;
        visibility: hidden;
    }
`;

export const DashStatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;

    @media (min-width: 560px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;
    align-items: center;
`;

export const DataContainer = styled.div`
    display: block;
    font-weight: 700;
    font-size: 64px;
`;

export const DataTypeContainer = styled(PageText)`
    font-size: 16px;
`;