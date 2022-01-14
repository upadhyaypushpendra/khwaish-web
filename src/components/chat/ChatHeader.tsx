import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';
import { Icon } from '@mui/material';
import TypingIndicator from './TypingIndicator';
import { ChatsSubSection, Friend } from '../../types';
import { deleteFriend } from '../../services/users';
import { useSnackbar } from 'notistack';
import { restoreSession } from '../../services/auth';
import { useLoadingOverlay } from "../LoadingOverlay";

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

    const [isTyping, setIsTyping] = React.useState(true);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleBack = () => setSubSection(ChatsSubSection.list);

    const handleUnfriend = async () => {
        console.log('DEBUG::handleUnfriend');
        showLoadingOverlay(`Removing ${activeChat?.name}...`);
        try {
            await deleteFriend(activeChat?._id);
            await restoreSession();
            handleBack();
        } catch (error) {
            console.log('DEBUG::handleDecline', error);
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

    return (
        <Box sx={{ flexGrow: 0, width: '100vw' }}>
            <AppBar position="static" sx={{ backgroundColor: '#7b1fa2' }}>
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
                    <Icon fontSize='large' sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        <AccountCircle fontSize='large' />
                    </Icon>
                    <Box display="flex" flexDirection="column" flexGrow={100}>
                        <Typography variant="body2" component="span">
                            {activeChat?.name}
                        </Typography>
                        <TypingIndicator isTyping={isTyping} />
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
        </Box>
    );
}
