import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import WebSocketClient from "../../utils/WebSocketClient";
import { WebSocketMessageEvent } from "../../types";
import MessageEditor from "./MessageEditor";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderTop: "1px solid lightgrey",
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
        // background: "#07616c",
        borderRadius: "32px",
        minHeight: "32px",
        // color: "white",
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

    // const inputRef = React.useRef<null | HTMLTextAreaElement>(null)

    const [message, setMessage] = React.useState("");

    const [buttonLoading, setButtonLoading] = React.useState(false);

    const [isTyping, setIsTyping] = React.useState(false);

    const typingCheckTimeoutRef = React.useRef<any>(0);

    const handleChange = () => {
        if (typingCheckTimeoutRef.current) {
            clearTimeout(typingCheckTimeoutRef.current);
        }
        typingCheckTimeoutRef.current = setTimeout(() => setIsTyping(false), 1000);
        if (!isTyping) setIsTyping(true);
    }

    async function handleSave(message: any) {
        if (message.trim().length === 0) return;
        try {
            onSave('text', message);
            setMessage("");
        } catch (e) {
            throw e;
        }
    }

    // const handleKeyDown = async (e: any) => (!e.shiftKey) && e.keyCode === 13 && message && handleSubmit(e);

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

    return (
        <Paper
            component="div"
            className={classes.root}
            elevation={2}
            square={true}
        >
            {/* <textarea
                style={{ resize: 'none' }}
                rows={3}
                className={classes.input}
                placeholder={placeholder}
                autoFocus={true}
                ref={inputRef}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={message}
            /> */}
            <MessageEditor onSave={handleSave} onChange={handleChange} />
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
