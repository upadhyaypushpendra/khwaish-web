import { styled } from '@mui/material/styles';
import Chat from './chat/Chat';
import ChatList from './chat/ChatList';

const ChatsWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    maxHeight: '100vh',
}));

export default function Chats() {
    return (
        <ChatsWrapper>
            <ChatList />
            <Chat />
        </ChatsWrapper>
    );
}
