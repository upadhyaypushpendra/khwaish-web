import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    unreadCounter: {
        position: "absolute",
        width: 24,
        height: 24,
        left: 10,
        top: 8,
        backgroundColor: "#EF5350",
        color: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bolder",
        fontFamily: "auto",
        fontSize: "1rem",
    },
});

type UnreadMessageCounterProps = {
    value: number;
    [k: string]: any,
};
export default function UnreadMessageCounter({ value, ...props }: UnreadMessageCounterProps) {
    const classes = useStyles();

    return value > 0 ? (
        <span className={classes.unreadCounter} {...props}>
            {value}
        </span>
    ) : (
        ""
    );
}
