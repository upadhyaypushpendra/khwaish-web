import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import { useLoadingOverlay } from "../components/LoadingOverlay";
import { signup } from "../services/auth";
import { validatePassword } from "../utils";
import { validateAndParsePhone } from "../utils/phone";
import HtmlTooltip from "../components/HtmlTooltop";
import TransitionAlert from "../components/TransitionAlert";
import AppLogo from "../components/AppLogo";

const defaultErrors = {
    phone: "",
    signIn: "",
    password: "",
};

const Signup = () => {
    const snackbar = useSnackbar();
    const loadingOvelay = useLoadingOverlay();
    const navigate = useNavigate();

    const [errors, setErrors] = React.useState(defaultErrors);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        loadingOvelay.showLoadingOverlay("Signing you in...");

        const _errors = { ...defaultErrors };

        try {
            const formData = new FormData(event.currentTarget);
            const _phoneNumber = formData.get("phone")?.toString();
            const password = formData.get("password")?.toString();
            const name = formData.get("name")?.toString();
            const about = formData.get("about")?.toString();

            if (_phoneNumber) {
                const { isValid } = validateAndParsePhone(_phoneNumber);
                if (!isValid) _errors.phone = "Please enter a valid phone number";
            }

            if (!validatePassword(password)) {
                _errors.password = "Please enter a valid password";
            }

            if (!Boolean(_errors.phone && _errors.password)) {
                await signup({ phone: validateAndParsePhone(_phoneNumber).phoneNumber, password, name, about });
                navigate("/");
            } else {
                setErrors(_errors);
            }
        } catch (error) {
            const _error = error as any;
            _errors.signIn = _error?.message || "Unable to sign up! Please try again.";
            setErrors(_errors);
        } finally {
            loadingOvelay.hideLoadingOverlay();
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <AppLogo size={100} margin={24} />
                <Typography component="h1" variant="h6">
                    Lets get some details for Khwaish
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <HtmlTooltip title="Phone number with country code i.e. +91xxxxxxxxxx">
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Address"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            placeholder="Your phone number please..."
                            defaultValue="+91"
                            helperText={errors.phone}
                            error={Boolean(errors.phone)}
                        />
                    </HtmlTooltip>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography variant="body1">Password must Contains:</Typography>
                                <ul>
                                    <li>Atleast 8 characters</li>
                                    <li>A Lowercase character(a-z)</li>
                                    <li>A Uppercase character(A-Z)</li>
                                    <li>A number character(0-9)</li>
                                    <li>A special character(@$!%*#?&)</li>
                                </ul>
                            </React.Fragment>
                        }
                    >
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            placeholder="Set a strong password..."
                            helperText={errors.password}
                            error={Boolean(errors.password)}
                        />
                    </HtmlTooltip>
                    <TextField
                        variant="filled"
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        placeholder="Get set your name?"
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        fullWidth
                        id="about"
                        label="About"
                        name="about"
                        placeholder="Lets add something about you?"
                        multiline
                        InputProps={{
                            rows: 3
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Signup for Kwaish
                    </Button>
                    <Box display="flex" justifyContent="center">
                        <TransitionAlert
                            severity="error"
                            message={errors.signIn}
                            onClose={() => setErrors({ ...errors, signIn: "" })}
                        />
                    </Box>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/">Already have an account? Sign In</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default Signup;
