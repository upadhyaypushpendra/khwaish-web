import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, createTheme, PaletteMode } from "@mui/material";
import { Close } from "@mui/icons-material";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { getThemeDesign } from "../theme";
import ThemeSwitch from "../components/ThemeSwtich";
import { LoadingOverlayProvider } from "../components/LoadingOverlay";
import App from "./App";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";
import SessionProvider from "../components/SessionProvider";
import Session from "../utils/Session";

const Screens = () => {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState<PaletteMode>(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const newTheme = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("theme", newTheme);
          return newTheme;
        });
      }
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getThemeDesign(mode)), [mode]);

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
    <ThemeProvider theme={theme}>
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
            <Box
              sx={{
                position: "fixed",
                right: 0,
                top: 0
              }}
            >
              <ThemeSwitch
                sx={{ m: 1 }}
                checked={mode === "dark"}
                onChange={colorMode.toggleColorMode}
              />
            </Box>
            <Routes>
              <Route path="/home" element={<App />}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ForgotPassword />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </SessionProvider>
        </SnackbarProvider>
      </LoadingOverlayProvider>
    </ThemeProvider>
  );
};

export default Screens;
