import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import WebSocketClient from "../../utils/WebSocketClient";
import { WebSocketMessageEvent } from "../../types";
import MessageEditor from "./MessageEditor";
import { convertToRaw, EditorState } from "draft-js";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderTop: "1px solid lightgrey",
        margin: 0,
        padding: 0,
    },
    input: {
        marginLeft: 8,
        marginTop: 4,
        flex: 1,
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
    messageTextField: {
        backgroundColor: "transparent",
        width: "calc(100% - 60px)",
    },
}));

type ReplyContainerProps = {
    onSave: (type: string, content: any) => void,
    placeholder?: string;
    userId: string,
    friendId: string,
};

export default function ReplyContainer({ onSave, userId, friendId }: ReplyContainerProps) {
    const classes = useStyles();

    const [isTyping, setIsTyping] = React.useState(false);

    const typingCheckTimeoutRef = React.useRef<any>(0);

    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    async function handleSave() {
        try {
            onSave('text', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
            setEditorState(EditorState.createEmpty());
        } catch (e) {
            throw e;
        }
    }

    React.useEffect(() => {
        WebSocketClient.sendMessage({
            event: WebSocketMessageEvent.typing,
            data: {
                from: userId,
                to: friendId,
                isTyping,
            }
        })
    }, [isTyping]);

    const handleChange = (newEditorState: EditorState) => {
        if (typingCheckTimeoutRef.current) {
            clearTimeout(typingCheckTimeoutRef.current);
        }
        typingCheckTimeoutRef.current = setTimeout(() => setIsTyping(false), 1000);
        if (!isTyping) setIsTyping(true);
        setEditorState(newEditorState);
    };

    return (
        <Paper
            component="div"
            className={classes.root}
            elevation={2}
            square={true}
        >
            <MessageEditor editorState={editorState} onSave={handleSave} onChange={handleChange} />
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
