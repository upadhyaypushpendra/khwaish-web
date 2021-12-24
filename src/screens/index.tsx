import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, createTheme, PaletteMode } from "@mui/material";
import { Close } from "@mui/icons-material";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { getThemeDesign } from "../theme";
import ThemeSwitch from "../components/ThemeSwtich";
// import PrivateRoute from "../components/PrivateRoute";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";

const Screens = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
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

  return (
    <ThemeProvider theme={theme}>
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
        <BrowserRouter>
          <Switch>
            <Route path="/signup" children={Signup} />
            <Route path="/reset-password" children={ForgotPassword} />
            <Route path="/" children={SignIn} />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Screens;
