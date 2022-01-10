import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RequestsIcon from '@mui/icons-material/GroupAdd';
import ChatsIcon from '@mui/icons-material/Forum';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppLogo from './AppLogo';
import shallow from 'zustand/shallow';
import { useStore } from '../store';
import { AppTab } from '../types';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function AppBar() {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [tab, setTab] = useStore((state) => [state.tab, state.setTab], shallow);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleRequestsClick = () => setTab(AppTab.requests);

    const handleProfileClick = () => setTab(AppTab.profile);

    const handleChatsClick = () => setTab(AppTab.chats);
    
    const handleFindClick = () => setTab(AppTab.find);

    const menuId = 'primary-search-account-menu';

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
            <MenuItem onClick={handleProfileClick}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MUIAppBar position="static">
                <Toolbar>
                    <AppLogo />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Khwaish
                    </Typography>
                    {tab === AppTab.chats &&
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search Friends…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    }
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
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileClick}
                            color="inherit"
                        >
                            <AccountCircleIcon />
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
        </Box>
    );
}
