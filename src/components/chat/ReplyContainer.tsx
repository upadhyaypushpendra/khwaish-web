import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import WebSocketClient from "../../utils/WebSocketClient";
import { WebSocketMessageEvent } from "../../types";
import { ContentState, convertFromHTML, convertFromRaw, convertToRaw, DraftHandleValue, Editor, EditorState } from 'draft-js';
import useStore from "../../store";
import shallow from "zustand/shallow";
import { keyBinding, blockStyle } from "../../utils/editor";
import RichTextEditor, { EditorValue, ToolbarConfig } from "react-rte";

const toolbarConfig: ToolbarConfig = {
    display: ["INLINE_STYLE_BUTTONS"],
    INLINE_STYLE_BUTTONS: [
        { label: "Bold", style: "BOLD", className: "custom-css-class" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" }
    ],
    BLOCK_TYPE_DROPDOWN: [],
    BLOCK_TYPE_BUTTONS: []
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderTop: "1px solid lightgrey",
        margin: 0,
        padding: 0,
        flex: "0 1 auto",
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: "90%",
        margin: 4,
    },
    sendMessageButton: {
        borderRadius: "32px",
        minHeight: "32px",
        margin: 0,
        border: "1px solid #979797",
    },
    editorContainer: {
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
}));

type ReplyContainerProps = {
    onSave: (type: string, content: any) => void,
    placeholder?: string;
    userId: string,
    friendId: string,
    onFocus?: () => void,
};

export default function ReplyContainer({ onSave, userId, friendId, onFocus }: ReplyContainerProps) {
    const classes = useStyles();
    // const rawEditorState = useStore((state) => state.rawEditorState, shallow);
    // const setRawEditorState = useStore(state => state.setRawEditorState);

    // const [editorState, setEditorState] =
    //     React.useState(EditorState.createEmpty());

    const editor = React.useRef<RichTextEditor | null>(null);

    // const [isTyping, setIsTyping] = React.useState(false);

    // const typingCheckTimeoutRef = React.useRef<any>(0);

    // React.useEffect(() => {
    //     focusEditor();
    //     setEditorState(EditorState.moveFocusToEnd(editorState));
    // }, []);

    // React.useEffect(() => {
    //     WebSocketClient.sendMessage({
    //         event: WebSocketMessageEvent.typing,
    //         data: {
    //             from: userId,
    //             to: friendId,
    //             isTyping,
    //         }
    //     })
    // }, [isTyping]);

    // React.useEffect(() => {
    //     if (typingCheckTimeoutRef.current) {
    //         clearTimeout(typingCheckTimeoutRef.current);
    //     }
    //     typingCheckTimeoutRef.current = setTimeout(() => setIsTyping(false), 1000);
    //     if (!isTyping) setIsTyping(true);
    // }, [editorState]);

    // const clearEditor = () => {
    //     const newEditorState = EditorState.createEmpty();
    //     setEditorState(newEditorState);
    // };

    // async function handleSave() {
    //     try {
    //         onSave('text', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    //         clearEditor();
    //         focusEditor();
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    // const handleKeyCommand = (command: string): DraftHandleValue => {
    //     if (command === 'send-message') {
    //         handleSave();
    //         return 'handled';
    //     }
    //     return 'not-handled';
    // };

    // const handleChange = (newState: EditorState) => {
    //     setEditorState(newState);
    //     // setRawEditorState(convertToRaw(newState.getCurrentContent()));
    // };

    const [value, setValue] = React.useState<EditorValue>(
        RichTextEditor.createValueFromString(
            "<p>what ab kya hoba asdf&nbsp;</p",
            "html"
        )
    );

    const clearEditor = () => setValue(RichTextEditor.createEmptyValue());

    const onChange = (value: EditorValue) => {
        setValue(value);
    };

    const handleSave = () => {
        const message = value.toString('html'); 
        onSave('text', message);
        clearEditor();
    };

    return (
        <Paper
            component="div"
            className={classes.root}
            elevation={2}
            square={true}
        >
            <div className={classes.editorContainer}>
                {/* <div className={classes.editors} onClick={focusEditor}>
                    <Editor
                        ref={editor}
                        editorState={editorState}
                        onChange={handleChange}
                        // placeholder="Type your message here..."
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={keyBinding}
                        blockStyleFn={blockStyle}
                        onBlur={focusEditor}
                        stripPastedStyles
                    />
                </div> */}
                <RichTextEditor
                    ref={editor}
                    value={value}
                    onChange={onChange}
                    toolbarConfig={toolbarConfig}
                    autoFocus={true}
                    placeholder="Type message here..."
                    editorStyle={{ backgroundColor: "inherit", color: 'inherit' }}
                    rootStyle={{ backgroundColor: "inherit", color: 'inherit' }}
                    toolbarStyle={{ backgroundColor: "inherit", color: 'inherit' }}
                />
            </div>
            <Divider className={classes.divider} orientation="vertical" />
            <Paper
                component={"div"}
                elevation={0}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                    alignItems: "center",
                }}
            >
                <Button
                    className={classes.sendMessageButton}
                    color="primary"
                    aria-label="send-message"
                    type="button"
                    variant="contained"
                    onClick={handleSave}
                >
                    SEND
                </Button>
            </Paper>
        </Paper>
    );
};
