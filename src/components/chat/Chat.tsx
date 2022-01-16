import { Box } from "@mui/material";
import React from "react";
import shallow from "zustand/shallow";
import useStore from "../../store";
import { ChatsSubSection, Section, WebSocketMessageEvent } from "../../types";
import ChatHeader, { HeaderEvent, HeaderEventType } from "./ChatHeader";
import FriendProfile from "./FriendProfile";
import {
    ActionResponse,
    ChatController,
    MuiChat,
} from 'chat-ui-react';
import WebSocketClient from "../../utils/WebSocketClient";
import Session from "../../utils/Session";

export default function Chat() {
    const [section, subSection] = useStore((state) => [state.section, state.subSection], shallow);
    const [activeChat] = useStore((state) => [state.activeChat], shallow);
    const [viewProfile, setViewProfile] = React.useState(false);
    const [chatController] = React.useState(
        new ChatController({
            showDateTime: true,
        }),
    );


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

    const handleSendMessage = React.useCallback(async ({ type, value, error }: ActionResponse) => {
        // Send message to server
        // console.log('DEBUG::activeChat', activeChat);
        WebSocketClient.sendMessage({
            event: 'send_message',
            data: {
                to: activeChat?._id,
                from: Session.userId,
                message: {
                    type,
                    value
                },
            }
        })
    }, [activeChat?._id]);

    const onMessageReceived = React.useCallback(async ({ to, from, message }: any) => {
        // Send message to server
        await chatController.addMessage({
            type: message.type,
            content: message.value,
            self: false,
        });
    }, [chatController]);

    React.useMemo(async () => {
        chatController.setActionRequest({ type: 'text', always: true }, handleSendMessage);
    }, [chatController]);

    React.useEffect(() => {
        WebSocketClient.addMessageListener(WebSocketMessageEvent.message_received, onMessageReceived);
    }, []);

    const handleCloseProfileView = () => setViewProfile(false);

    return section === Section.chats && subSection === ChatsSubSection.chat ? (
        <Box maxHeight={"100vh"} display="flex" flexDirection="column" position={"relative"}>
            <ChatHeader onEvent={handleHeaderEvent} />
            <Box flexGrow={3} sx={{ maxWidth: '100vw', maxHeight: '100vh - 60px', flex: '1 1 0%', backgroundColor: "blue", border: "1px solid green" }}>
                {activeChat?._id && <MuiChat chatController={chatController} />}
            </Box>
            <FriendProfile open={viewProfile} onClose={handleCloseProfileView} />
        </Box >
    ) : null;
}