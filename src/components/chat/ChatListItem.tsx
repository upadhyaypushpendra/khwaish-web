import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useSnackbar } from "notistack";
import { ChatsSubSection, Friend } from "../../types";
import TypingIndicator from "./TypingIndicator";
import useStore from '../../store';
import shallow from 'zustand/shallow';
//@ts-ignore
import ProfileIcon from '../ProfileIcon';

export type ChatListItemProps = {
    friend: Friend;
};

export default function ChatListItem({ friend }: ChatListItemProps) {
    const { _id, name, isTyping } = friend;

    const snackbar = useSnackbar();
    const setSubSection = useStore((state) => state.setSubSection, shallow);
    const setActiveChat = useStore((state) => state.setActiveChat, shallow);

    const handleChatListItemClick = async () => {
        setActiveChat(friend);
        setSubSection(ChatsSubSection.chat);
    };

    return (
        <ListItem sx={{ minHeight: "68px", borderBottom: "1px solid #a9a9a957" }} key={_id} onClick={handleChatListItemClick}>
            <ListItemAvatar>
                <ProfileIcon userId={_id} />
            </ListItemAvatar>

            <ListItemText primary={name} secondary={<TypingIndicator isTyping={Boolean(isTyping)} />} />
            <Divider variant="fullWidth" component="div" />
        </ListItem >
    );
}