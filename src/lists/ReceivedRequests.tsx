import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { getReceivedRequests } from '../services/requests';
import { useSnackbar } from 'notistack';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
}));

// const defaultList = [{ id: "1", name: "Raju", about: null }, { id: "2", name: "Golu", about: "About goluuu" }];

export default function ReceivedRequests() {
    const snackbar = useSnackbar();
    const [receivedRequests, setReceivedRequests] = React.useState([]);

    const handleAccept = (id: string) => {
        console.log('DEBUG::handleAccept ', id);
    };

    const handleDecline = (id: string) => {
        console.log('DEBUG::handleDecline ', id);

    };

    const loadRecievedRequests = () => {
        (async () => {
            try {
                const { requests } = await getReceivedRequests();
                setReceivedRequests(requests);
            } catch (error) {
                console.log('DEBUG::loadRecievedRequests', error);
                snackbar.enqueueSnackbar("Sorry!! Unable to load the received requests!", { variant: "error" });
            }
        })();
    };

    React.useEffect(loadRecievedRequests, []);

    return (
        <Demo>
            <List>
                {receivedRequests.length ? receivedRequests?.map(({ _id, name, about }) => (
                    <React.Fragment key={_id}>
                        <ListItem
                            key={_id}
                            secondaryAction={
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        sx={{ margin: "0 8px" }}
                                        onClick={() => handleAccept(_id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        sx={{ margin: "0 8px" }}
                                        onClick={() => handleDecline(_id)}
                                    >
                                        Decline
                                    </Button>
                                </Box>

                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name} secondary={about ? about : null} />
                        </ListItem>
                        <Divider variant="fullWidth" component="li" />
                    </React.Fragment>
                )) : (
                    <ListItem alignItems="center">
                        <ListItemText sx={{ textAlign: 'center' }}>
                            Not requests!!
                        </ListItemText>
                    </ListItem>
                )}
            </List >
        </Demo >
    );
}