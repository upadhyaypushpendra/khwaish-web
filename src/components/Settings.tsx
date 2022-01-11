import Typography from '@mui/material/Typography';
import { Box } from '@mui/material/node_modules/@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paper: {
        display: "flex",
        flexDirection: 'column',
        width: "100%",
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
                    height: 128,
                },
            }}
        >
            <Box className={classes.paper}>
                <Typography variant='h5'>Profile</Typography>
            </Box>
            <Box className={classes.paper}>
                <Typography variant='h5'>Theme</Typography>
            </Box>
        </Box>
    );
}
