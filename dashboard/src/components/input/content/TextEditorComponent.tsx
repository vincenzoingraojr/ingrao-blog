import {
    FunctionComponent,
} from "react";
import styled from "styled-components";
import { Editor } from "@ingrao-blog/editor";
import "@ingrao-blog/editor/dist/editor.css";

export interface TextEditorComponentProps {
    field: any;
    form: any;
}

const EditorComponentContainer = styled.div`
    display: block;
    width: 100%;
`;

const EditorContainer = styled.div`
    display: block;
    font-family: "Source Serif Pro", serif;
    min-height: 240px;
`;

function uploadImageCallBack(file: string) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      },
    );
  }

const TextEditorComponent: FunctionComponent<TextEditorComponentProps> = ({
    field,
    form,
}) => {
    
    return (
        <EditorComponentContainer>
            <EditorContainer>
                <Editor
                    toolbarClassName="rdw-storybook-toolbar editor-custom-toolbar"
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="rdw-storybook-editor editor-custom-body"
                    toolbar={{
                        options: [
                            "inline",
                            "blockType",
                            "list",
                            "textAlign",
                            "link",
                            "image",
                            "history"
                        ],
                        image: {
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: false },
                        },
                    }}
                    initialContentState={JSON.parse(field.value)}
                    onChange={(contentState) => {
                        form.setFieldValue(
                            field.name,
                            JSON.stringify(contentState)
                        );
                    }}
                />
            </EditorContainer>
        </EditorComponentContainer>
    );
};

export default TextEditorComponent;
