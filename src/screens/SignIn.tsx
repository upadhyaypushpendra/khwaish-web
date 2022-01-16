import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import { signIn } from "../services/auth";
import { useSnackbar } from "notistack";
import { useLoadingOverlay } from "../components/LoadingOverlay";
import Session from "../utils/Session";
import AppLogo from "../components/AppLogo";
import { validateAndParsePhone } from "../utils/phone";
import useStore from "../store";
import shallow from "zustand/shallow";

const SignIn = (props: any) => {
    const snackbar = useSnackbar();
    const loadingOvelay = useLoadingOverlay();
    const navigate = useNavigate();
    const [setLoggedIn, setUser] = useStore((state) => [state.setLoggedIn, state.setUser]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loadingOvelay.showLoadingOverlay("Signing you in...");
        try {
            const formData = new FormData(event.currentTarget);
            const _phoneNumber = formData.get("phone")?.toString();
            const password = formData.get("password")?.toString();

            if (_phoneNumber) {
                const { isValid, phoneNumber } = validateAndParsePhone(_phoneNumber);
                if (isValid && phoneNumber) {
                    await signIn({ phone: phoneNumber, password });
                    if (Boolean(formData.get("rememberMe"))) Session.rememberMe({ phone: phoneNumber, password });
                    else Session.unRememberMe();
                    navigate("/");
                    setLoggedIn(true);
                    setUser({ id: Session.userId, name: Session.name, phone: Session.phone, about: Session.phone });
                } else {
                    snackbar.enqueueSnackbar('Please enter a valid phone number', {
                        variant: "error",
                    })
                }
            }
        } catch (error) {
            if (error instanceof Error)
                snackbar.enqueueSnackbar(error?.message || "Unable to sign in! Please try again.", { variant: "error" });

            if (error instanceof String)
                snackbar.enqueueSnackbar(error || "Unable to sign in! Please try again.", { variant: "error" });
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
                    alignItems: "center",
                }}
            >
                <AppLogo size={100} margin={24} />
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                        autoFocus
                        placeholder="You phone here..."
                        defaultValue="+91"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="password"
                        placeholder="Your password here..."
                    />
                    <FormControlLabel
                        name="rememberMe"
                        control={<Checkbox defaultValue={"true"} value={true} color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/reset-password">Reset password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">Don't have an account? Sign Up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default SignIn;
