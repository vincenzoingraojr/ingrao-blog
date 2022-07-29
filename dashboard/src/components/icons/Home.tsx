import styled from "styled-components";
import { FunctionComponent } from "react";
import { SvgIcon } from "../../styles/global";
import { IconProps } from "./common";

const HomeIcon = styled(SvgIcon).attrs(
    (props: { isActive: boolean }) => props
)`
    width: 26px;
    height: 26px;
    fill: ${(props) => (props.isActive ? "blue" : "none")};
    stroke: ${(props) => (props.isActive ? "blue" : "#000000")};
`;

const Home: FunctionComponent<IconProps> = ({ isActive }) => {
    return (
        <HomeIcon isActive={isActive}>
            {isActive ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 22V10L12 2L2 10V22H8V14H16V22H22Z" strokeWidth="2" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 10V22H15V15H9V22H2V10L12 2L22 10Z" strokeWidth="2" />
                </svg>
            )}
        </HomeIcon>
    );
}

export default Home;
