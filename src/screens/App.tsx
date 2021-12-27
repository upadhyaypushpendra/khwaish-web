import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useLoadingOverlay } from "../components/LoadingOverlay";
import { Avatar } from "@mui/material";

const App = (props: any) => {
  const loadingOverlay = useLoadingOverlay();
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
