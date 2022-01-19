import React from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import TextareaAutosize, { TextareaAutosizeProps } from "@mui/material/TextareaAutosize";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import WebSocketClient from "../../utils/WebSocketClient";
import { WebSocketMessageEvent } from "../../types";

const CustomTextArea = styled((props: TextareaAutosizeProps) => (
    <TextareaAutosize {...props} />
))({
    padding: 8,
    fontSize: "1em",
    resize: "none",
    width: "-webkit-fill-available",
    minHeight: "1em",
    maxHeight: "4em",
    backgroundColor: 'inherit',
    color: 'inherit',
    border: 'none',
});

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
    divider: {
        height: "90%",
        margin: 4,
    },
    sendMessageButton: {
        borderRadius: "32px",
        minHeight: "32px",
        margin: 0,
        border: "1px solid #979797",
        padding: 0,
    },
    editorContainer: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    messageArea: {
        padding: 8,
        fontSize: "1em",
        resize: "none",
        width: "-webkit-fill-available",
        minHeight: "1em",
        maxHeight: "4em",
        backgroundColor: 'inherit',
        color: 'inherit',
        border: 'none',
    },
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

    const [isTyping, setIsTyping] = React.useState(false);

    const typingCheckTimeoutRef = React.useRef<any>(0);

    const [value, setValue] = React.useState<string>("");

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

    React.useEffect(() => {
        if (typingCheckTimeoutRef.current) {
            clearTimeout(typingCheckTimeoutRef.current);
        }
        typingCheckTimeoutRef.current = setTimeout(() => setIsTyping(false), 5000);
        if (!isTyping) setIsTyping(true);
    }, [value]);

    const handleChange = (e: any) => setValue(e.target.value);

    const handleKeyDown = (evt: any) => {
        if (evt.keyCode === 13 && !evt.shiftKey) {
            handleSave();
            evt.preventDefault();
        } else {
            setValue(evt.target.value);
        }
    };

    const handleSave = () => {
        onSave('text', value.replace(/(\r\n)+/g, "\r\n")
            .replace(/\r+/g, "\r")
            .replace(/\n+/g, "\n")
            .replace("\n", "<br>"));
        
        setValue("");
    };

    return (
        <Paper
            component="div"
            className={classes.root}
            elevation={2}
            square={true}
        >
            <div className={classes.editorContainer}>
                <textarea
                    value={value}
                    id="messageArea"
                    name="messageArea"
                    placeholder="Type message here.."
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={classes.messageArea}
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
                    endIcon={<SendIcon />}
                >
                    SEND
                </Button>
            </Paper>
        </Paper>
    );
};
