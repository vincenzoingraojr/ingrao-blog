import styled from "styled-components";
import { FunctionComponent } from "react";
import { SvgIcon } from "../../styles/global";
import { IconProps } from "./common";

const MailIcon = styled(SvgIcon).attrs((props: { isActive: boolean }) => props)`
    width: 26px;
    height: 26px;
    fill: ${(props) => (props.isActive ? "blue" : "#000000")};
    stroke: none;
`;

const Mail: FunctionComponent<IconProps> = ({ isActive }) => {
    return (
        <MailIcon isActive={isActive}>
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1 3L1 5.23381L3 6.43381L10 10.6338L11.9437 11.8L12 11.8338L12.0563 11.8L14 10.6338L21 6.43381L23 5.23381V7.56619L21 8.76619L12 14.1662L10 12.9662L3 8.76619L1 7.56619L1 21H23V3H1Z" />
                </svg>                
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1 3V21H23V3H1ZM3 6.43381V5H21V6.43381L12 11.8338L3 6.43381ZM3 8.76619V19H21V8.76619L12 14.1662L3 8.76619Z" />
                </svg>
            )}
        </MailIcon>
    );
};

export default Mail;