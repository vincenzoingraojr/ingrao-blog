import styled from "styled-components";
import { FunctionComponent } from "react";
import { SvgIcon } from "../../styles/global";
import { IconProps } from "./common";

const AddIcon = styled(SvgIcon).attrs(
    (props: { isActive: boolean }) => props
)`
    width: 26px;
    height: 26px;
    fill: none;
    stroke: ${(props) => (props.isActive ? "blue" : "#000000")};
`;

const Add: FunctionComponent<IconProps> = ({ isActive }) => {
    return (
        <AddIcon isActive={isActive}>
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V12M12 21V12M12 12H3M12 12H21" strokeWidth="3" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V12M12 21V12M12 12H3M12 12H21" strokeWidth="2" />
                </svg>
            )}
        </AddIcon>
    );
}

export default Add;
