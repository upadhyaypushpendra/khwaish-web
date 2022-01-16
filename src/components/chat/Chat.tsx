import React from "react";
import Box from "@mui/material/Box";
import shallow from "zustand/shallow";
import useStore from "../../store";
import { ChatsSubSection, Section, WebSocketMessageEvent } from "../../types";
import ChatHeader, { HeaderEvent, HeaderEventType } from "./ChatHeader";
import FriendProfile from "./FriendProfile";
import WebSocketClient from "../../utils/WebSocketClient";
import Session from "../../utils/Session";
import ChatController, { ChatMessage } from "../../utils/ChatController";
import ReplyContainer from "./ReplyContainer";
import MessagesContainer from "./MessagesContainer";

export default function Chat() {
    const [section, subSection] = useStore((state) => [state.section, state.subSection], shallow);
    const [activeChat] = useStore((state) => [state.activeChat], shallow);
    const [viewProfile, setViewProfile] = React.useState(false);
    const [chatController, setChatController] = React.useState<ChatController | null>(null);
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);


    const handleHeaderEvent = async (event: HeaderEvent) => {
        // console.log('DEBUG::handleHeaderEvent', event);
        switch (event.type) {
            case HeaderEventType.view_profile_click: {
                setViewProfile(true);
                break;
            }
            default: {

            }
        }
    }

    const handleSendMessage = React.useCallback((type = 'text', content: string) => {
        // Send message to server
        chatController?.sendMessage({
            type: 'text',
            content,
        });
        //@ts-ignore
        setMessages([...(chatController?.messages)]);
    }, [activeChat?._id, chatController, Session.userId]);

    const onMessageReceived = React.useCallback(async (message: ChatMessage) => {
        // Send message to server
        if (message.to === Session.userId && message.from === activeChat?._id && chatController) {
            chatController.addMessage({
                type: message.type,
                content: message.content,
                self: false,
                from: message.from,
                to: message.to,
                sentTime: message.sentTime,
            });
            setMessages([...(chatController?.messages)]);
        }
    }, [chatController?.messages.length, activeChat?._id, messages.length]);

    React.useEffect(() => {
        const id = WebSocketClient.addMessageListener(WebSocketMessageEvent.message_received, onMessageReceived);

        return () => WebSocketClient.removeMessageListener(id);
    }, [activeChat?._id, onMessageReceived]);

    React.useEffect(() => {
        if (activeChat?._id) {
            setChatController(new ChatController({
                messages: [],
                receiverId: activeChat?._id,
                senderId: Session.userId,
            }));
        }
    }, [activeChat?._id, Session.userId]);

    const handleCloseProfileView = () => setViewProfile(false);

    return section === Section.chats && subSection === ChatsSubSection.chat ? (
        <Box maxHeight={"100vh"} display="flex" flexDirection="column" position={"relative"}>
            <ChatHeader onEvent={handleHeaderEvent} />
            <Box
                display="flex"
                flexDirection="column"
                flexGrow={3}
                sx={{
                    maxWidth: '100vw',
                    height: '100vh',
                    border: "1px solid green",
                }}
            >
                <MessagesContainer messages={messages} />
                <Box justifySelf="flex-end" flexGrow={0}>
                    <ReplyContainer
                        onSave={handleSendMessage}
                        placeholder="Type your message here..."
                        userId={Session.userId}
                        friendId={activeChat?._id as string}
                    />
                </Box>
            </Box>
            <FriendProfile open={viewProfile} onClose={handleCloseProfileView} />
        </Box >
    ) : null;
}