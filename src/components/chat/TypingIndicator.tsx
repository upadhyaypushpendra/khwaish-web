import { Typography } from "@mui/material";
import React from "react";
import { WebSocketMessageEvent } from "../../types";
import Session from "../../utils/Session";
import WebSocketClient from "../../utils/WebSocketClient";

export type TypingIndicatorProps = {
    isTyping?: boolean;
    friendId: string;
};

export default function TypingIndicator({ friendId }: TypingIndicatorProps) {
    const [isTyping, setIsTyping] = React.useState(false);

    const typingEventHandler = React.useCallback(async (data: any) => {
        if (data.to === Session.userId && data.from === friendId) {
            setIsTyping(data.isTyping);
        }
    }, [friendId, Session.userId]);

    React.useEffect(() => {
        const id = WebSocketClient.addMessageListener(WebSocketMessageEvent.typing, typingEventHandler);

        return () => WebSocketClient.removeMessageListener(id);
    }, [isTyping, typingEventHandler]);


    return (
        <Typography component="span" variant="caption" sx={{ color: isTyping ? "#67a716" : "transparent" }}>
            typing...
        </Typography>
    );
}

// theme === 'light' ? "#8e24aa" : "#7b1fa2" 