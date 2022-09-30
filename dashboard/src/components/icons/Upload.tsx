import styled from "styled-components";
import { FunctionComponent } from "react";
import { SvgIcon } from "../../styles/global";

interface UploadProps {
    color?: string;
}

const UploadIcon = styled(SvgIcon).attrs((props: { color: string }) => props)`
    width: 26px;
    height: 26px;
    fill: ${(props) => (props.color ? props.color : "#000000")};
    stroke: none;
`;

const Upload: FunctionComponent<UploadProps> = ({ color }) => {
    return (
        <UploadIcon color={color}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L5.29289 8.70711L6.70711 10.1213L11 5.82843V19.4142H2V21.4142H22V19.4142H13V5.82843L17.2929 10.1213L18.7071 8.70711L12 2Z" />
            </svg>
        </UploadIcon>
    );
};

export default Upload;
