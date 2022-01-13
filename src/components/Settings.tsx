import Typography from '@mui/material/Typography';
import { Box } from '@mui/material/node_modules/@mui/system';
import { makeStyles } from '@mui/styles';
import ThemeSwitch from './ThemeSwtich';
import TextField from '@mui/material/TextField';
import Session from '../utils/Session';
import PhoneNumberField from './PhoneNumberField';

const useStyles = makeStyles({
    paper: {
        display: "flex",
        flexDirection: 'column',
        width: "50%",
        height: "fit-content",
        padding: '1rem',
        borderBottom: "1px solid #00000052"
    },
});

export default function Settings() {
    const classes = useStyles();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 0,
                    width: "100%",
                },
            }}
        >
            <Box className={classes.paper}>
                <Typography variant='h5'>Profile</Typography>
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    disabled
                    defaultValue={Session.name}
                />
                <PhoneNumberField
                    disabled
                    defaultValue={Session.phone}
                />
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="about"
                    label="About"
                    name="about"
                    disabled
                    defaultValue={Session.about}
                    multiline
                // InputProps={{}}
                />
            </Box>
            <Box className={classes.paper}>
                <Typography variant='h5'>Theme</Typography>
                <ThemeSwitch />
            </Box>
        </Box>
    );
}
