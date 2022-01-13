import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import { useSnackbar } from "notistack";
import { sendRequest } from "../../services/requests";
import { ChatsSubSection, Friend } from "../../types";
import TypingIndicator from "./TypingIndicator";
import { useStore } from '../../store';
import shallow from 'zustand/shallow';

export type ChatListItemProps = {
    friend: Friend;
};

export default function ChatListItem({ friend }: ChatListItemProps) {
    const { _id, name, isTyping } = friend;

    const snackbar = useSnackbar();
    const setSubSection = useStore((state) => state.setSubSection, shallow);
    const setActiveChat = useStore((state) => state.setActiveChat, shallow);

    const handleChatListItemClick = async () => {
        console.log('DEBUG::handleChatListItemClick begin');
        setActiveChat(friend);
        setSubSection(ChatsSubSection.chat);
    };


    return (
        <ListItem sx={{ minHeight: "68px", borderBottom: "1px solid #a9a9a957" }} key={_id} onClick={handleChatListItemClick}>
            <ListItemAvatar>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={<TypingIndicator isTyping={Boolean(isTyping)} />} />
            <Divider variant="fullWidth" component="div" />
        </ListItem>
    );
}