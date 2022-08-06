import { FunctionComponent } from "react";
import styled from "styled-components";
import { $getRoot, $getSelection } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

export interface EditorComponentProps {
    field: any;
    form: any;
}

const EditorContainer = styled.div`
    display: block;
    min-height: 54px;
    max-height: 120px;
    overflow: auto;
`;

function onChange(editorState: any) {
    editorState.read(() => {
        const root = $getRoot();
        const selection = $getSelection();

        console.log(root, selection);
    });
}

function onError(error: any) {
    console.error(error);
}

const EditorComponent: FunctionComponent<EditorComponentProps> = ({
    field,
    form,
}) => {
    const initialConfig = {
        namespace: "postContent",
        onError,
    };

    return (
        <EditorContainer>
            <LexicalComposer initialConfig={initialConfig}>
                <PlainTextPlugin
                    contentEditable={<ContentEditable />}
                    placeholder={""}
                />
                <OnChangePlugin onChange={onChange} />
                <HistoryPlugin />
            </LexicalComposer>
        </EditorContainer>
    );
};

export default EditorComponent;
