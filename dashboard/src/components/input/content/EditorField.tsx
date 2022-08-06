import { Field } from "formik";
import { FunctionComponent, useEffect, useRef, useState } from "react";
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
    position: relative;
    border: 2px solid #000000;
    background-color: transparent;
    min-height: 64px;
    padding-left: 12px;
    padding-right: 12px;
`;

const EditorInfoContainer = styled.div.attrs(
    (props: { focus: boolean }) => props
)`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: ${(props) => (props.focus ? "4px" : "19px")};
    margin-bottom: ${(props) => (props.focus ? "4px" : "0px")};
    transition: margin ease 0.2s;
`;

const LabelEditorInfo = styled.label.attrs((props: { focus: boolean }) => props)`
    display: block;
    font-size: ${(props) => (props.focus ? "14px" : "16px")};
    cursor: pointer;
    transition: font-size ease 0.2s;
`;

const EditorContainer = styled.div`
    display: flex;
    align-items: center;
    min-height: 26px;
    width: 100%;
    margin-top: 30px;
    transition: margin ease 0.2s;
    margin-bottom: 4px;
`;

const EditorField: FunctionComponent<EditorFieldProps> = ({
    field,
    placeholder,
    errors,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const editorField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editorField !== null && editorField.current?.value !== "") {
            setIsFocused(true);
        }
    }, [isFocused]);
    
    return (
        <EditorFieldWrapper>
            {errors[field] ? (
                <EditorFieldError>{errors[field]}</EditorFieldError>
            ) : null}
            <EditorFieldContainer
                onClick={() => {
                    setIsFocused(true);

                    if (editorField !== null) {
                        editorField.current?.focus();
                    }
                }}
            >
                <EditorInfoContainer focus={isFocused}>
                    <LabelEditorInfo htmlFor={field} focus={isFocused}>
                        {placeholder}
                    </LabelEditorInfo>
                </EditorInfoContainer>
                <EditorContainer>
                    <Field
                        name={field}
                        component={EditorComponent}
                        onFocus={() => {
                            setIsFocused(true);
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                        }}
                        innerRef={editorField}
                    />
                </EditorContainer>
            </EditorFieldContainer>
        </EditorFieldWrapper>
    );
};

export default EditorField;
