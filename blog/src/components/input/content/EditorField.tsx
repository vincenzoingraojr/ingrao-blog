import { Field } from "formik";
import { FunctionComponent } from "react";
import TextEditorComponent from "./TextEditorComponent";
import styled from "styled-components";

interface EditorFieldProps {
    field: string;
    errors: any;
    itemId?: number;
}

const EditorFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const EditorFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

const EditorFieldContainer = styled.div`
    display: block;
    background-color: transparent;
    border: 2px solid #000000;
    width: 100%;
`;

const EditorField: FunctionComponent<EditorFieldProps> = ({
    field,
    errors,
    itemId,
}) => {
    return (
        <EditorFieldWrapper>
            {errors[field] ? (
                <EditorFieldError>{errors[field]}</EditorFieldError>
            ) : null}
            <EditorFieldContainer>
                <Field name={field} component={TextEditorComponent} itemId={itemId} />
            </EditorFieldContainer>
        </EditorFieldWrapper>
    );
};

export default EditorField;
