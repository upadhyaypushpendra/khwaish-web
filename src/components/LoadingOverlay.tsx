import React from "react";
import Backdrop from "@mui/material/Backdrop";
import { DefaultTheme, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme: DefaultTheme) => ({
  backdrop: {
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  }
}));

type LoadingOverlayContextType = {
  _loading: boolean;
  _setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  _message: string;
  _setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const LoadingOverlayContext = React.createContext({
  _loading: false,
  _message: "",
  _setLoading: (value: boolean) => { },
  _setMessage: (value:  string) => { },
});

const LoadingOverlay = () => {
  const classes = useStyles();
  const { _loading, _message } = React.useContext(LoadingOverlayContext);

  return (
    <Backdrop className={classes.backdrop} open={_loading}>
      <Box
        display="flex"
        flexDirection="column"
        textAlign="center"
        minWidth="200px"
      >
        <Typography variant="h5" style={{ marginBottom: 8 }}>
          {_message}
        </Typography>
        <LinearProgress color="primary" />
      </Box>
    </Backdrop>
  );
};

const LoadingOverlayProvider = ({ children }: any) => {
  const [_loading, _setLoading] = React.useState(false);
  const [_message, _setMessage] = React.useState("");

  return (
    <LoadingOverlayContext.Provider
      value={
        {
          _loading,
          _setLoading,
          _message,
          _setMessage
        }
      }
    >
      <LoadingOverlay />
      {children}
    </LoadingOverlayContext.Provider>
  );
};

const useLoadingOverlay = () => {
  const { _setLoading, _setMessage } = React.useContext(LoadingOverlayContext);

  const showLoadingOverlay = (_message = "") => {
    _setMessage(_message);
    _setLoading(true);
  };

  const hideLoadingOverlay = () => {
    _setMessage("");
    _setLoading(false);
  };

  return { showLoadingOverlay, hideLoadingOverlay };
};

export default LoadingOverlay;

export { LoadingOverlayProvider, useLoadingOverlay };
