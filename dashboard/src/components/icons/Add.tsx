import styled from "styled-components";
import { FunctionComponent, useEffect, useState } from "react";
import { SvgIcon } from "../../styles/global";
import { IconProps } from "./common";

interface AddProps extends IconProps {
    color?: string;
}

const AddIcon = styled(SvgIcon).attrs(
    (props: { isActive: boolean; color: string }) => props
)`
    width: 26px;
    height: 26px;
    fill: none;
    stroke: ${(props) =>
        props.isActive ? "blue" : props.color ? props.color : "#000000"};
`;

const Add: FunctionComponent<AddProps> = ({ isActive, color }) => {
    const [state, setState] = useState(false);

    useEffect(() => {
        if (isActive === undefined || isActive === null) {
            setState(false);
        } else {
            setState(isActive);
        }
    }, [isActive]);

    return (
        <AddIcon isActive={state} color={color}>
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 3V12M12 21V12M12 12H3M12 12H21"
                        strokeWidth="3"
                    />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 3V12M12 21V12M12 12H3M12 12H21"
                        strokeWidth="2"
                    />
                </svg>
            )}
        </AddIcon>
    );
};

export default Add;
