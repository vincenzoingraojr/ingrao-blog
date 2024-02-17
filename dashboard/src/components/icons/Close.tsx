import styled from "styled-components";
import { FunctionComponent, useEffect, useState } from "react";
import { SvgIcon } from "../../styles/global";

interface CloseProps {
    type: "normal" | "small";
    color?: string;
}

const CloseIcon = styled(SvgIcon).attrs(
    (props: { isNormal: boolean; color: string }) => props
)`
    width: ${(props) => (props.isNormal ? "26px" : "20px")};
    height: ${(props) => (props.isNormal ? "26px" : "20px")};
    fill: none;
    stroke: ${(props) => (props.color ? props.color : "#000000")};
`;

const Close: FunctionComponent<CloseProps> = ({ type, color }) => {
    const [isNormal, setIsNormal] = useState(false);

    useEffect(() => {
        if (type === "normal") {
            setIsNormal(true);
        } else {
            setIsNormal(false);
        }
    }, [type]);

    return (
        <CloseIcon isNormal={isNormal} color={color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L20 20M20 4L4 20" strokeWidth="2" />
            </svg>
        </CloseIcon>
    );
};

export default Close;
