import { Field } from "formik";
import { FunctionComponent } from "react";
import EditorComponent from "./EditorComponent";
import styled from "styled-components";

interface EditorFieldProps {
    field: string;
    placeholder: string;
    errors: any;
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
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;
`;

const EditorInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: 4px;
    margin-bottom: 4px;
`;

const EditorInfo = styled.div`
    display: block;
    font-size: 14px;
`;

const EditorFieldInnerContainer = styled.div`
    display: block;
    width: 100%;
    margin-bottom: 4px;
`;

const EditorField: FunctionComponent<EditorFieldProps> = ({
    field,
    placeholder,
    errors,
}) => {
    return (
        <EditorFieldWrapper>
            {errors[field] ? (
                <EditorFieldError>{errors[field]}</EditorFieldError>
            ) : null}
            <EditorFieldContainer>
                <EditorInfoContainer>
                    <EditorInfo>{placeholder}</EditorInfo>
                </EditorInfoContainer>
                <EditorFieldInnerContainer>
                    <Field name={field} component={EditorComponent} />
                </EditorFieldInnerContainer>
            </EditorFieldContainer>
        </EditorFieldWrapper>
    );
};

export default EditorField;
