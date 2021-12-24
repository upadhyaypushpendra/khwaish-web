import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { SnackbarKey, SnackbarProvider } from "notistack";
// import PrivateRoute from "../components/PrivateRoute";
import SignIn from "./SignIn";
import theme from "../theme";

const Screens = () => {
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
