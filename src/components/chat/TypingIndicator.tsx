import { Typography } from "@mui/material";
// import useStore from "../../store";
// import shallow from "zustand/shallow";

export type TypingIndicatorProps = {
    isTyping: boolean;
};

export default function TypingIndicator({ isTyping }: TypingIndicatorProps) {
    // const [theme] = useStore((state) => [state.theme], shallow);

    return (
        <Typography component="span" variant="caption" sx={{ color: isTyping ? "#67a716" : "transparent" }}>
            typing...
        </Typography>
    );
}

// theme === 'light' ? "#8e24aa" : "#7b1fa2" 