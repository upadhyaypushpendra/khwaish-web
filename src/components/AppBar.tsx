import * as React from 'react';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import RequestsIcon from '@mui/icons-material/GroupAdd';
import ChatsIcon from '@mui/icons-material/Forum';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppLogo from './AppLogo';
import shallow from 'zustand/shallow';
import useStore from '../store';
import { ChatsSubSection, RequestsSubSection, Section } from '../types';


export default function AppBar() {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [section, setSection, subSection] =
        useStore((state) => [state.section, state.setSection, state.subSection], shallow);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleRequestsClick = () => {
        setSection(Section.requests);
        handleMobileMenuClose();
    };

    const handleSettingsClick = () => {
        setSection(Section.profile);
        handleMobileMenuClose();
    };

    const handleChatsClick = () => {
        setSection(Section.chats);
        handleMobileMenuClose();
    }

    const handleFindClick = () => {
        setSection(Section.find);
        handleMobileMenuClose();
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleFindClick}>
                <IconButton
                    size="large"
                    aria-label="show find-friends"
                    aria-controls="primary-search-person"
                    color="inherit"
                >
                    <PersonSearchIcon />
                </IconButton>
                <p>Find friends</p>
            </MenuItem>
            <MenuItem onClick={handleChatsClick}>
                <IconButton
                    size="large"
                    aria-label="show chats"
                    aria-controls="primary-search-requests"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <ChatsIcon />
                    </Badge>
                </IconButton>
                <p>Chats</p>
            </MenuItem>
            <MenuItem onClick={handleRequestsClick}>
                <IconButton
                    size="large"
                    aria-label="show notifications"
                    aria-controls="primary-search-requests"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <RequestsIcon />
                    </Badge>
                </IconButton>
                <p>Requests</p>
            </MenuItem>
            <MenuItem onClick={handleSettingsClick}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    color="inherit"
                >
                    <SettingsIcon />
                </IconButton>
                <p>Settings</p>
            </MenuItem>
        </Menu>
    );

    return (
        !(section === Section.chats && subSection === ChatsSubSection.chat) ?
            (<Box sx={{ flexGrow: 1 }}>
                <MUIAppBar position="static" sx={{ backgroundColor: '#7b1fa2' }}>
                    <Toolbar>
                        <AppLogo />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'block', sm: 'block' } }}
                        >
                            Khwaish
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                aria-label="Show chats"
                                color="inherit"
                                onClick={handleChatsClick}
                            >
                                <Badge badgeContent={0} color="info">
                                    <ChatsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="Show requests"
                                color="inherit"
                                onClick={handleRequestsClick}
                            >
                                <Badge badgeContent={0} color="info">
                                    <RequestsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="Find friends"
                                color="inherit"
                                onClick={handleFindClick}
                            >
                                <PersonSearchIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="Show profile"
                                aria-haspopup="true"
                                onClick={handleSettingsClick}
                                color="inherit"
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </MUIAppBar>
                {renderMobileMenu}
            </Box>) : null
    );
}
