import { Box, Icon, IconButton, Slide } from "@mui/material";
import { useStore } from "../../store";
import shallow from "zustand/shallow";
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ProfileImage from "../../assets/profile.jpg";

export type FriendProfileProps = {
    onClose?: () => void,
    open?: boolean,
};

export default function FriendProfile({ open = false, onClose = () => { } }: FriendProfileProps) {
    const [activeChat] = useStore((state) => [state.activeChat], shallow);

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box
                position={"relative"}
                display={"flex"}
                flexDirection={"column"}
                height={"100%"}
                width={"100%"}
                sx={{ backgroundColor: "#262523" }}
            >
                <Box
                    display="flex"
                    position={"absolute"}
                    right={0}
                    top={0}
                    zIndex={1000}
                >
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>
                    <Card sx={{ minWidth: 300, maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={ProfileImage}
                                alt="Profile Image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {activeChat?.name}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {activeChat?.phone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {activeChat?.about}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>
        </Slide>
    );
}