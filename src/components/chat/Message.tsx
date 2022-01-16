import Linkify from "react-linkify";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

const useStyles = makeStyles((theme) => ({
    selfMessageWrapper: {
        padding: "3px",
        marginRight: "4px",
        "&> div": {
            maxWidth: "65%",
            width: "fit-content",
            borderRadius: "16px 0 16px 16px",
            backgroundColor: "#6161610a",
            border: "solid 1px #00000024",
            padding: 8,
            marginLeft: "auto",
        },
    },
    messageWrapper: {
        padding: "3px",
        marginLeft: "4px",
        "&> div": {
            maxWidth: "65%",
            width: "fit-content",
            borderRadius: "0 16px 16px 16px",
            border: "solid 1px transparent",
            backgroundColor: "#86DACD",
            padding: 8,
            marginRight: "auto",
        },
    },
    message: {
        marginBottom: 0,
        textAlign: "left",
        wordBreak: "break-word",
    },
    dateSent: {
        fontSize: "85%",
        letterSpacing: "0.5px",
        marginTop: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
}));

type MessageProps = {
    body: string,
    unread: boolean,
    isSelf: boolean,
    dateSent: string,
};

export default function Message({ body, unread, isSelf, dateSent }: MessageProps) {
    const classes = useStyles();

    return (
        <div
            className={isSelf ? classes.selfMessageWrapper : classes.messageWrapper}
        >
            <div>
                <div className={classes.message}>
                    <Typography>
                        <Linkify>
                            {body}
                        </Linkify>
                    </Typography>
                </div>
                <div className={classes.dateSent} style={{ textAlign: "right" }}>
                    {dateSent}
                    {isSelf && (
                        <DoneAllRoundedIcon
                            fontSize="small"
                            color={unread ? "disabled" : "primary"}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
