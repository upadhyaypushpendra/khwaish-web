import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useLoadingOverlay } from "../components/LoadingOverlay";
import Avatar from "@mui/material/Avatar";
import ResponsiveAppBar from "../components/AppBar";

const App = (props: any) => {
  const loadingOverlay = useLoadingOverlay();
  
  return (
    <Container component="main" style={{margin: 0, padding: 0, maxWidth: '100%'}}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Avatar sx={{
        marginBottom: 8,
        borderRadius: 0,
        bgcolor: "transparent",
        width: "50%",
        height: "50%"
      }}>
        <img alt="Khwaish" src={"/AppLogo.png"} width="50%" height="auto" />
      </Avatar>
      <h1>Kwaish App</h1>
    </Container>
  );
};

export default App;
