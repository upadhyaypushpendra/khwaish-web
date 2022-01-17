import Linkify from "react-linkify";
import dayjs from 'dayjs';
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import Box from "@mui/material/Box";
import { ChatMessage } from "../../utils/ChatController";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import MessageEditor from "./MessageEditor";
import React from "react";

const useStyles = makeStyles((theme) => ({
    selfMessageWrapper: {
        padding: "3px",
        marginRight: "4px",
        "&> div": {
            width: "fit-content",
            borderRadius: "16px 0 16px 16px",
            border: "solid 1px transparent",
            padding: 8,
            marginLeft: "auto",
            boxShadow: "-3px 3px 5px 0px #9a49bd8c",
        },
    },
    messageWrapper: {
        padding: "3px",
        marginLeft: "4px",
        "&> div": {
            width: "fit-content",
            borderRadius: "0 16px 16px 16px",
            border: "solid 1px #00000005",
            padding: 8,
            marginRight: "auto",
            boxShadow: "3px 3px 5px 0px #00000024",
        },
    },
    message: {
        marginBottom: 0,
        textAlign: "left",
        wordBreak: "break-word",
    },
    dateSent: {
        textAlign: "right",
        marginTop: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
    },
}));


function MessageStatus(message: ChatMessage) {
    const classes = useStyles();

    return (
        <Box
            className={classes.dateSent}
            minWidth={'60px'}
        >
            <Typography
                component={"span"}
                variant="caption"
            >
                {dayjs(message.sentTime as string).format('hh:mm a')}
            </Typography>
            {message.self &&
                (
                    message.read
                        ?
                        (<DoneAllRoundedIcon fontSize="small" color={"success"} />)
                        :
                        message.delivered
                            ?
                            (<DoneAllRoundedIcon fontSize="small" color={"disabled"} />)
                            :
                            (<DoneRoundedIcon fontSize="small" color={"disabled"} />)
                )
            }

        </Box>
    );
};

type MessageProps = {
    message: ChatMessage;
};

export default function Message({ message }: MessageProps) {
    const classes = useStyles();
    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(message.content)))
    );
    return (
        <Box
            justifySelf={message.self ? 'flex-end' : 'flex-start'}
            alignSelf={message.self ? 'flex-end' : 'flex-start'}
            className={message.self ? classes.selfMessageWrapper : classes.messageWrapper}
            maxWidth={"75%"}
        >
            <Box
                display={"flex"}
                flexWrap={"wrap"}
                sx={{
                    backgroundColor: message.self ? "primary.light" : "secodary.main",
                    color: message.self ? "primary" : "secondary",
                    minWidth: 120,
                }}
            >
                <Box className={classes.message} flexGrow={1}>
                    <Editor editorState={editorState} readOnly={true} onChange={() => { }} />
                </Box>
                <MessageStatus {...message} />
            </Box>

        </Box>
    );
};
