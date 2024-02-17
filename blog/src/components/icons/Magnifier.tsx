import styled from "styled-components";
import { FunctionComponent, useEffect, useState } from "react";
import { SvgIcon } from "../../styles/global";
import { IconProps } from "./common";

interface MagnifierProps extends IconProps {
    type: "normal" | "small";
}

const MagnifierIcon = styled(SvgIcon).attrs(
    (props: { isNormal: boolean, isActive: boolean }) => props
)`
    width: ${props => props.isNormal ? "26px" : "22px"};
    height: ${props => props.isNormal ? "26px" : "22px"};
    fill: none;
    stroke: ${(props) => (props.isActive ? "blue" : "#000000")};
`;

const Magnifier: FunctionComponent<MagnifierProps> = ({ type, isActive }) => {
    const [isNormal, setIsNormal] = useState(false);

    useEffect(() => {
        if (type === "normal") {
            setIsNormal(true);
        } else {
            setIsNormal(false);
        }
    }, [type]);

    return (
        <MagnifierIcon isNormal={isNormal} isActive={isActive}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8593 14.8593L20 20M14.8593 14.8593C17.3435 12.3751 17.3435 8.34739 14.8593 5.86317C12.3751 3.37894 8.34739 3.37894 5.86317 5.86317C3.37894 8.34739 3.37894 12.3751 5.86317 14.8593C8.34739 17.3435 12.3751 17.3435 14.8593 14.8593Z" strokeWidth={isActive ? "2.6" : "2"} strokeLinecap="square" />
            </svg>
        </MagnifierIcon>
    );
}

export default Magnifier;