import React from "react";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import { getUsers } from "../services/users";
import { useSnackbar } from "notistack";
import { sendRequest } from "../services/requests";


const ListWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,

}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(0),
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    height: '68px',
    [theme.breakpoints.up('sm')]: {
        width: '100%',
    },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    flexGrow: 1,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

// const defaultList = [{ id: "1", name: "Raju", about: null }, { id: "2", name: "Golu", about: "About goluuu" }];

const TIMEOUT = 500; //milliseconds

export default function FindFriends(props: any) {
    const snackbar = useSnackbar();
    const [result, setResult] = React.useState([]);
    const [input, setInput] = React.useState("");
    const fetchUsersTimeout = React.useRef<NodeJS.Timeout | null>(null);

    const handleSendRequest = async (id: string) => {
        console.log('DEBUG::handleSendRequest ', id);
        try {
            await sendRequest(id);
            snackbar.enqueueSnackbar("Request Sent!!", {
                variant: "success",
            });
        } catch (error) {
            console.log('DEBUG::handleInputChange -> Error', error);
            snackbar.enqueueSnackbar("Sorry unable to Send Request", {
                variant: "error",
            });
        }
    };

    const handleInputChange = async (e: any) => {
        console.log('DEBUG::handleInputChange ', e.target.value);

        setInput(e.target.value);

        const input = e.target.value?.trim();

        if (fetchUsersTimeout.current) clearTimeout(fetchUsersTimeout.current);

        fetchUsersTimeout.current = setTimeout(async () => {
            if (Boolean(input)) {
                try {
                    const { users } = await getUsers(input);
                    setResult(users);
                } catch (error) {
                    console.log('DEBUG::handleInputChange -> Error', error);
                    setResult([]);
                }
            } else {
                setResult([]);
            }
        }, TIMEOUT);
    };

    return (
        <React.Fragment>
            <Paper elevation={1} sx={{ m: 1 }}>
                <Search>
                    <StyledInputBase
                        value={input}
                        placeholder="Search with your friend's name or phone..."
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={handleInputChange}
                    />
                    <IconButton type="submit" sx={{ p: '10px', flexGrow: 0 }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Search>
            </Paper>
            <ListWrapper>
                <List>
                    {result.length ?
                        (result?.map(({ id, name, about }) => (
                            <React.Fragment key={id}>
                                <ListItem
                                    key={id}
                                    secondaryAction={
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                sx={{ margin: "0 8px" }}
                                                onClick={() => handleSendRequest(id)}
                                            >
                                                Send Request
                                            </Button>
                                        </Box>

                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={name} secondary={about ? about : null} />
                                </ListItem>
                                <Divider variant="fullWidth" component="li" />
                            </React.Fragment>
                        ))) : (
                            <ListItem alignItems="center">
                                <ListItemText sx={{ textAlign: 'center' }}>
                                    Not found anything!! Try with some other phone or name
                                </ListItemText>
                            </ListItem>
                        )
                    }
                </List >
            </ListWrapper>
        </React.Fragment>
    );
}
