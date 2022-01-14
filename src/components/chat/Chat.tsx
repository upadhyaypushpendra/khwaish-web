import { Box } from "@mui/material";
import React from "react";
import shallow from "zustand/shallow";
import { useStore } from "../../store";
import { ChatsSubSection, Section } from "../../types";
import ChatHeader, { HeaderEvent, HeaderEventType } from "./ChatHeader";
import FriendProfile from "./FriendProfile";

export default function Chat() {
    const [section, subSection] = useStore((state) => [state.section, state.subSection], shallow);
    const [activeChat] = useStore((state) => [state.activeChat], shallow);
    const [viewProfile, setViewProfile] = React.useState(false);

    const handleHeaderEvent = async (event: HeaderEvent) => {
        console.log('DEBUG::handleHeaderEvent', event);
        switch (event.type) {
            case HeaderEventType.view_profile_click: {
                setViewProfile(true);
                break;
            }
            default: {

            }
        }
    }

    const handleCloseProfileView = () => setViewProfile(false);

    return section === Section.chats && subSection === ChatsSubSection.chat ? (
        <Box height={"100vh"} display="flex" flexDirection="column">
            <ChatHeader onEvent={handleHeaderEvent} />
            <Box display={"flex"} flexDirection={"row"} flexGrow={2}>
                <Box flexGrow={3}>Chat Areaa</Box>
                {viewProfile && <FriendProfile onClose={handleCloseProfileView} />}
            </Box>
        </Box>
    ) : null;
}