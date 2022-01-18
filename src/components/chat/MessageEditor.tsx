import React from 'react';
import { ContentBlock, convertFromRaw, convertToRaw, DraftHandleValue, Editor, EditorState } from 'draft-js';
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;
import { makeStyles } from "@mui/styles";
import useStore from '../../store';
import shallow from 'zustand/shallow';

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
    onSave: () => void,
    onFocus?: () => void,
};

export default function MessageEditor(props: TypingEditorProps) {
    const classes = useStyles();
    const rawEditorState = useStore((state) => state.rawEditorState, shallow);
    const setRawEditorState = useStore(state => state.setRawEditorState);

    const [editorState, setEditorState] =
        React.useState(EditorState.createWithContent(convertFromRaw(rawEditorState)));

    const editor = React.useRef<Editor | null>(null);

    function focusEditor() {
        if (editor.current) editor.current.focus();
        props.onFocus?.();
    }

    React.useEffect(() => {
        focusEditor();
        setEditorState(EditorState.moveFocusToEnd(editorState));
    }, []);

    const handleKeyCommand = (command: string): DraftHandleValue => {
        if (command === 'send-message') {
            setEditorState(EditorState.createEmpty());
            props.onSave();
            focusEditor();
            return 'handled';
        }
        return 'not-handled';
    };

    const handleChange = (newState: EditorState) => {
        setEditorState(newState);
        setRawEditorState(convertToRaw(newState.getCurrentContent()));
    };

    return (
        <div className={classes.editorContainer}>
            <div className={classes.editors} onClick={focusEditor}>
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={handleChange}
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