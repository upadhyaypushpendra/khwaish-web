import List from '@mui/material/List';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import { ChatsSubSection, Section } from '../../types';
import Session from '../../utils/Session';
import ChatListItem from './ChatListItem';

export default function ChatList() {
    const [section, subSection] = useStore((state) => [state.section, state.subSection], shallow);

    return section === Section.chats && subSection === ChatsSubSection.list ? (
        <List >
            {Session.friends?.map((friend: any) => (<ChatListItem friend={friend} />))}
        </List >
    ) : null;
}