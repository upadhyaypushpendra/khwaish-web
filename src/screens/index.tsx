import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, createTheme, PaletteMode } from "@mui/material";
import { Close } from "@mui/icons-material";
import { SnackbarKey, SnackbarProvider } from "notistack";
// import PrivateRoute from "../components/PrivateRoute";
import SignIn from "./SignIn";
import { getThemeDesign } from "../theme";
import ThemeSwitch from "../components/ThemeSwtich";

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
          style={{
            position: "static",
            right: 10,
            top: 10
          }}
        >
          <ThemeSwitch
            sx={{ m: 1 }}
            defaultChecked
            checked={mode === "dark"}
            onChange={colorMode.toggleColorMode}
          />
        </Box>
        <BrowserRouter>
          <Switch>
            <Route path="/" children={SignIn} />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Screens;
