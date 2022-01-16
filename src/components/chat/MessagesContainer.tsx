import React from "react";
import Box from "@mui/material/Box";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Message from "./Message";
import { ChatMessage } from "../../utils/ChatController";

export type MessagesContanerProps = {
    messages: ChatMessage[];
};

export default function MessagesContainer(props: MessagesContanerProps) {
    const [stopOnScroll, setStopOnScroll] = React.useState(false);
    const messagesEndRef = React.useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" });
    }

    useScrollPosition(({ prevPos, currPos }) => {
        const isShow = currPos.y > prevPos.y
        if (isShow !== stopOnScroll) setStopOnScroll(isShow)
    }, [])

    React.useEffect(scrollToBottom, [props.messages])

    return (
        <Box flexGrow={1} display="flex" flexDirection="column" overflow={'scroll'} sx={{ paddingTop: "80px" }}>
            {props.messages.map(message => (<Message key={message.id} message={message} />))}
            <div ref={messagesEndRef} />
        </Box>
    );
}