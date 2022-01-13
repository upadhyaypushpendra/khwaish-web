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
import { acceptRequest, declineRequest, getReceivedRequests } from '../services/requests';
import { useSnackbar } from 'notistack';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
}));

// const defaultList = [{ id: "1", name: "Raju", about: null }, { id: "2", name: "Golu", about: "About goluuu" }];

export default function ReceivedRequests() {
    const snackbar = useSnackbar();
    const [receivedRequests, setReceivedRequests] = React.useState([]);

    const handleAccept = async (id: string) => {
        console.log('DEBUG::handleAccept ', id);
        try {
            await acceptRequest(id);
            loadRecievedRequests();
        } catch (error) {
            console.log('DEBUG::handleAccept', error);
            snackbar.enqueueSnackbar("Sorry!! Unable to accept this request.", { variant: "error" });
        }
    };

    const handleDecline = async (id: string) => {
        console.log('DEBUG::handleDecline ', id);
        try {
            await declineRequest(id);
            loadRecievedRequests();
        } catch (error) {
            console.log('DEBUG::handleDecline', error);
            snackbar.enqueueSnackbar("Sorry!! Unable to decline the request.", { variant: "error" });
        }
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
                {receivedRequests.length ? receivedRequests?.map(({ _id, sender }: any) => (
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
                            <ListItemText primary={sender?.name} secondary={sender?.about ? sender?.about : null} />
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