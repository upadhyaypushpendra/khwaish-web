import React from 'react';
import Icon from '@mui/material/Icon';
import Badge from '@mui/material/Badge';
//@ts-ignore
import Identicon from 'react-identicons';
import WebSocketClient from '../utils/WebSocketClient';
import { WebSocketMessageEvent } from '../types';
import Session from '../utils/Session';


type ProfileIconProps = {
    userId?: string;
}

export default function ProfileIcon({ userId = Date.now().toString() }: ProfileIconProps) {
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        const id = WebSocketClient.addMessageListener(WebSocketMessageEvent.active_status, (data: any) => {
            if (data.userId === userId) setActive(data.active);
        });

        return () => WebSocketClient.removeMessageListener(id);
    }, [WebSocketClient.client?.OPEN, userId]);


    React.useEffect(() => {
        if (WebSocketClient.isConnected() && userId) {
            WebSocketClient.sendMessage({
                event: "active_status",
                data: {
                    toUser: Session.userId,
                    forUser: userId,
                },
            })
        }
    }, [WebSocketClient.client?.OPEN, userId]);

    return (
        <Badge
            color={active ? "success" : "secondary"}
            variant="dot" sx={{ mr: 2 }}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'top'
            }}
        >
            <Icon fontSize='large' sx={{ display: 'flex', alignItems: 'center', borderRadius: '50%' }}>
                <Identicon size={32} string={userId} />
            </Icon>
        </Badge>
    );
}