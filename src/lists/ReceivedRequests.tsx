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

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const defaultList = [{ id: "1", name: "Raju", about: null }, { id: "2", name: "Golu", about: "About goluuu" }];

export default function ReceivedRequests() {
    const [receivedRequests, setReceivedRequests] = React.useState(defaultList);

    const handleAccept = (id: string) => {
        console.log('DEBUG::handleAccept ', id);
    };

    const handleDecline = (id: string) => {
        console.log('DEBUG::handleDecline ', id);
    };

    return (
        <Demo>
            <List>
                {receivedRequests?.map(({ id, name, about }) => (
                    <React.Fragment key={id}>
                        <ListItem
                            key={id}
                            secondaryAction={
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        sx={{ margin: "0 8px" }}
                                        onClick={() => handleAccept(id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        sx={{ margin: "0 8px" }}
                                        onClick={() => handleDecline(id)}
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
                ))
                }
            </List >
        </Demo >
    );
}