import {
    FunctionComponent, useState,
} from "react";
import styled from "styled-components";
import { Editor } from "@ingrao-blog/editor";
import "@ingrao-blog/editor/dist/editor.css";

export interface TextEditorComponentProps {
    field: any;
    form: any;
    itemId?: number;
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

const TextEditorComponent: FunctionComponent<TextEditorComponentProps> = ({
    field,
    form,
    itemId,
}) => {
    const [initialContent] = useState<any | undefined>(() => {
        const content = field.value;
        return content ? JSON.parse(content) : JSON.parse('{"blocks":[{"key":"t5iq","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}');
    });

    function uploadImageCallBack(file: File) {
        return new Promise(
            async (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let itemImageName = "";
                let directory = "";
                itemImageName = `comment-image-${new Date().getTime()}.jpeg`;
                directory =
                    process.env.REACT_APP_ENV === "development"
                        ? `local-comments/${itemId}`
                        : `comments/${itemId}`;
            
                let key = `${directory}/${itemImageName}`;
                const { url } = await fetch(
                    `${process.env.REACT_APP_SERVER_ORIGIN}/presigned-url`,
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            key: key,
                        }),
                    }
                ).then((res) => res.json());
                xhr.open("PUT", url);
                xhr.setRequestHeader("Content-Type", "multipart/form-data");
                xhr.send(file);
                console.log(xhr);
                xhr.addEventListener("load", () => {
                    const imageLink = `https://storage.ingrao.blog/${key}`;
                    resolve({ data: { link: imageLink } });
                });
                xhr.addEventListener("error", (error) => {
                    reject(error);
                });
            },
        );
    }

    return (
        <EditorComponentContainer>
            <EditorContainer>
                <Editor
                    toolbarClassName="rdw-storybook-toolbar"
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="rdw-storybook-editor editor-custom-body"
                    toolbar={{
                        options: [
                            "inline",
                            "list",
                            "link",
                            "image",
                            "history"
                        ],
                        image: {
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: false },
                            showImageLoading: true,
                            previewImage: true,
                        },
                    }}
                    initialContentState={initialContent}
                    onChange={(contentState) => {
                        if (JSON.stringify(contentState) === '{"blocks":[{"key":"t5iq","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
                            form.setFieldValue(field.name, "");
                        } else {
                            form.setFieldValue(
                                field.name,
                                JSON.stringify(contentState)
                            );
                        }
                    }}
                />
            </EditorContainer>
        </EditorComponentContainer>
    );
};

export default TextEditorComponent;
