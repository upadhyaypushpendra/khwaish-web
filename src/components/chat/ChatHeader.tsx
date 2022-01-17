import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useStore from '../../store';
import shallow from 'zustand/shallow';
import TypingIndicator from './TypingIndicator';
import { ChatsSubSection, WebSocketMessageEvent } from '../../types';
import { deleteFriend } from '../../services/users';
import { useSnackbar } from 'notistack';
import { restoreSession } from '../../services/auth';
import { useLoadingOverlay } from "../LoadingOverlay";
//@ts-ignore
import ProfileIcon from '../ProfileIcon';
import WebSocketClient from '../../utils/WebSocketClient';
import Session from '../../utils/Session';

export enum HeaderEventType {
    view_profile_click,
};

export type HeaderEvent = {
    type: HeaderEventType,
    data?: any,
};

export type ChatHeaderProps = {
    onEvent?: (event: HeaderEvent) => void,
};

export default function ChatHeader({ onEvent }: ChatHeaderProps) {
    const snackbar = useSnackbar();
    const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay()

    const [activeChat, setSubSection] = useStore((state) => [state.activeChat, state.setSubSection], shallow);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [isTyping, setIsTyping] = React.useState(false);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleBack = () => setSubSection(ChatsSubSection.list);

    const handleUnfriend = async () => {
        // console.log('DEBUG::handleUnfriend');
        showLoadingOverlay(`Removing ${activeChat?.name}...`);
        try {
            await deleteFriend(activeChat?._id);
            await restoreSession();
            handleBack();
        } catch (error) {
            // console.log('DEBUG::handleDecline', error);
            snackbar.enqueueSnackbar(`Sorry!! Unable to unfriend ${activeChat?.name}`, { variant: "error" });
        } finally {
            handleClose();
            hideLoadingOverlay();
        }
    };

    const handleViewProfile = () => {
        if (onEvent) onEvent({ type: HeaderEventType.view_profile_click });
        handleClose();
    }

    const typingEventHandler = React.useCallback(async (data: any) => {
        if (data.to === Session.userId && data.from === activeChat?._id) {
            setIsTyping(data.isTyping);
        }
    }, [activeChat?._id, Session.userId]);

    React.useEffect(() => {
        const id = WebSocketClient.addMessageListener(WebSocketMessageEvent.typing, typingEventHandler);

        return () => WebSocketClient.removeMessageListener(id);
    }, [isTyping, typingEventHandler]);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#7b1fa2', flexGrow: 0, width: '100vw' }}>
            <Toolbar sx={{ display: 'flex', alignItems: "center", width: '100vw', p: 0, mr: 1, ml: 1 }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleBack}
                >
                    <BackIcon />
                </IconButton>
                <ProfileIcon userId={activeChat?._id} />
                <Box display="flex" flexDirection="column" flexGrow={100}>
                    <Typography variant="body2" component="span">
                        {activeChat?.name}
                    </Typography>
                    <Box>
                        <TypingIndicator friendId={activeChat?._id as string} />
                    </Box>
                </Box>
                <Box flexGrow={1}>
                    <IconButton
                        size="large"
                        aria-label="more"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                    <MenuItem onClick={handleUnfriend}>Unfriend</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
