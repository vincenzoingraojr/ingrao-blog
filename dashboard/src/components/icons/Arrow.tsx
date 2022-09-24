import { FunctionComponent } from "react";
import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

interface ArrowProps {
    color?: string;
}

const ArrowIcon = styled(SvgIcon)`
    width: 24px;
    height: 24px;
    fill: ${(props) => (props.color ? props.color : "#000000")};
    stroke: none;
`;

const Arrow: FunctionComponent<ArrowProps> = ({ color }) => {
    return (
        <ArrowIcon color={color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.41421 11L9.7071 5.70711L8.29289 4.29289L0.585785 12L8.29289 19.7071L9.7071 18.2929L4.41421 13H22V11H4.41421Z" />
            </svg>
        </ArrowIcon>
    );
};

export default Arrow;
