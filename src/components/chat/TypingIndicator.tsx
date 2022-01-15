import { Typography } from "@mui/material";
// import useStore from "../../store";
// import shallow from "zustand/shallow";

export type TypingIndicatorProps = {
    isTyping: boolean;
};

export default function TypingIndicator({ isTyping }: TypingIndicatorProps) {
    // const [theme] = useStore((state) => [state.theme], shallow);

    return isTyping ? (
        <Typography component="span" variant="caption" sx={{ color: "#67a716"}}>
            typing...
        </Typography>
    ) : null;
}

// theme === 'light' ? "#8e24aa" : "#7b1fa2" 