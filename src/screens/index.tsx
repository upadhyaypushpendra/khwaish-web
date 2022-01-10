import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, PaletteMode } from "@mui/material";
import { Close } from "@mui/icons-material";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { getThemeDesign } from "../theme";
import { LoadingOverlayProvider } from "../components/LoadingOverlay";
import App from "./App";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";
import SessionProvider from "../components/SessionProvider";
import Session from "../utils/Session";
import { useStore } from "../store";
import shallow from "zustand/shallow";

const Screens = () => {
    const navigate = useNavigate();
    const [theme] = useStore((state) => [state.theme], shallow);

    // Update the theme only if the theme changes
    const muiTheme = React.useMemo(() => createTheme(getThemeDesign(theme)), [theme]);

    const notistackRef: React.RefObject<SnackbarProvider> = React.createRef();

    const onClickDismiss = (key: SnackbarKey) => () => {
        notistackRef?.current?.closeSnackbar(key);
    };

    React.useEffect(() => {
        if (!Session.isLoggedIn()) {
            navigate("/signin");
        }
    }, []);

    return (
        <ThemeProvider theme={muiTheme}>
            <LoadingOverlayProvider>
                <SnackbarProvider
                    ref={notistackRef}
                    action={(key) => (
                        <Button onClick={onClickDismiss(key)}>
                            <Close fontSize="small" />
                        </Button>
                    )}
                    hideIconVariant
                    maxSnack={3}
                >
                    <SessionProvider>
                        <Routes>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/reset-password" element={<ForgotPassword />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </SessionProvider>
                </SnackbarProvider>
            </LoadingOverlayProvider>
        </ThemeProvider>
    );
};

export default Screens;
