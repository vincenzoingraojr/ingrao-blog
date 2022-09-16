import { FunctionComponent } from "react";
import styled from "styled-components";

export interface EditorComponentProps {
    field: any;
    form: any;
}

const EditorContainer = styled.div`
    display: block;
`;

const EditorComponent: FunctionComponent<EditorComponentProps> = ({
    field,
    form,
}) => {
    return (
        <EditorContainer>
            Content
        </EditorContainer>
    );
};

export default EditorComponent;
