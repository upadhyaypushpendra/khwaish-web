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
import { declineRequest, getSentRequests } from '../services/requests';
import { useSnackbar } from 'notistack';
import Session from '../utils/Session';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

// const defaultList = [{ _id: "1", name: "Raju", about: null }, { _id: "2", name: "Golu", about: "About me" }];

export default function SentRequests() {
    const snackbar = useSnackbar();
    const [sentRequests, setSentRequests] = React.useState([]);

    const handleDecline = async (id: string) => {
        console.log('DEBUG::handleDecline ', id);
        try {
            await declineRequest(id);
            loadSentRequests();
        } catch (error) {
            console.log('DEBUG::handleDelete', error);
            snackbar.enqueueSnackbar("Sorry!! Unable to decline the request.", { variant: "error" });
        }
    };

    const loadSentRequests = () => {
        if (Session.userId)
            (async () => {
                try {
                    const { requests } = await getSentRequests();
                    setSentRequests(requests);
                } catch (error) {
                    console.log('DEBUG::loadSentRequests', error);
                    snackbar.enqueueSnackbar("Sorry!! Unable to load the sent requests!", { variant: "error" });
                }
            })();
    };

    React.useEffect(loadSentRequests, [Session.userId]);

    return (
        <Demo>
            <List>
                {sentRequests.length ? sentRequests?.map(({ _id, receiver }: any) => (
                    <React.Fragment key={_id}>
                        <ListItem
                            key={_id}
                            secondaryAction={
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Button
                                        color="error"
                                        variant="contained"
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
                            <ListItemText
                                primary={receiver?.name}
                                secondary={receiver?.about ? receiver?.about : null}
                            />
                        </ListItem>
                        <Divider variant="fullWidth" component="li" />
                    </React.Fragment>
                )) : (
                    <ListItem alignItems="center">
                        <ListItemText sx={{ textAlign: 'center' }}>
                            You don't have any requests!!
                        </ListItemText>
                    </ListItem>
                )
                }
            </List >
        </Demo >
    );
}