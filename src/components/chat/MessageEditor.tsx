import React from 'react';
import { ContentBlock, convertToRaw, DraftHandleValue, Editor, EditorState } from 'draft-js';
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import { Box } from '@mui/material';
const { hasCommandModifier } = KeyBindingUtil;

function keyBinding(e: any): string | null {
    if (e.keyCode === 13 && hasCommandModifier(e)) {
        return 'send-message';
    }
    return getDefaultKeyBinding(e);
}

function blockStyle(contentBlock: ContentBlock) {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
        return 'Blockquote';
    }
    return "";
}


export type TypingEditorProps = {
    onSave: (value: any) => void,
    onChange: () => void
};

export default function MessageEditor(props: TypingEditorProps) {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const editor = React.useRef<Editor | null>(null);

    function focusEditor() {
        if (editor.current) editor.current.focus();
    }

    React.useEffect(() => {
        focusEditor()
    }, []);

    const handleKeyCommand = (command: string): DraftHandleValue => {
        if (command === 'send-message') {
            props.onSave(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
            setEditorState(EditorState.createEmpty());
            focusEditor();
            return 'handled';
        }
        return 'not-handled';
    };

    const handleChange = (newEditorState: EditorState) => {
        props.onChange();
        setEditorState(newEditorState);
    };

    return (
        <Box
            onClick={focusEditor}
            flexGrow={1}
            sx={{
                border: '1px solid black',
            }}
        >
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={handleChange}
                placeholder="Type your message here..."
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={keyBinding}
                blockStyleFn={blockStyle}
            />
        </Box>
    );
}