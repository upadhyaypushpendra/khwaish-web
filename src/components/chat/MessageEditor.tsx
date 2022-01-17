import React from 'react';
import { ContentBlock, DraftHandleValue, Editor, EditorState } from 'draft-js';
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    editorContainer: {
        // padding: "1em",
        // margin: "1em",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    controlsContainer: {
        display: "flex",
        "& > *": {
            margin: "2px",
        }
    },
    buttonSelected: {
        backgroundColor: "gray",
    },
    editors: {
        border: "1px black solid",
        padding: "0.5em",
        margin: "2px",
        fontFamily: "OpenSans",
        fontSize: "1em",
        maxHeight: "43em",
        minHeight: "4em",
        height: "4em",
        overflow: "auto",
    }
});

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
    editorState: EditorState;
    onSave: () => void,
    onChange: (newState: EditorState) => void,
};

export default function MessageEditor(props: TypingEditorProps) {
    const classes = useStyles();
    const editor = React.useRef<Editor | null>(null);

    function focusEditor() {
        if (editor.current) editor.current.focus();
    }

    React.useEffect(() => {
        focusEditor()
    }, []);

    const handleKeyCommand = (command: string): DraftHandleValue => {
        if (command === 'send-message') {
            props.onSave();
            focusEditor();
            return 'handled';
        }
        return 'not-handled';
    };

    return (
        <div className={classes.editorContainer}>
            <div className={classes.editors} onClick={focusEditor}>
                <Editor
                    ref={editor}
                    editorState={props.editorState}
                    onChange={props.onChange}
                    // placeholder="Type your message here..."
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={keyBinding}
                    blockStyleFn={blockStyle}
                    onBlur={focusEditor}
                />
            </div>
        </div>
    );
}