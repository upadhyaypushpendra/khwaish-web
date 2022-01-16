import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
    onSave: (message: any) => void,
    placeholder: string;
};

export default function ReplyContainer({ onSave, placeholder }: ReplyContainerProps) {
    const classes = useStyles();

    const [message, setMessage] = React.useState("");

    const [buttonLoading, setButtonLoading] = React.useState(false);

    const handleChange = (e: any) => setMessage(e.target.value);

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (message.trim().length === 0) return;

        setButtonLoading(true);

        try {
            await onSave(message);
            setMessage("");
        } catch (e) {
            throw e;
        }

        setButtonLoading(false);
    }

    const handleKeyDown = async (e: any) =>
        e.ctrlKey && e.keyCode === 13 && message && handleSubmit(e);

    return (
        <Paper
            component="form"
            className={classes.root}
            onSubmit={handleSubmit}
            elevation={2}
            square={true}
        >
            <InputBase
                multiline
                rows={3}
                className={classes.input}
                inputProps={{
                    placeholder,
                    autoFocus: true,
                }}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={message}
            />
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
                    type="submit"
                    variant="contained"
                    disabled={buttonLoading || message.length === 0}
                >
                    SEND
                </Button>
                <Typography variant="caption" style={{ opacity: 0.5 }}>
                    Ctrl + Enter
                </Typography>
            </Paper>
        </Paper>
    );
};
