import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useLoadingOverlay } from "../components/LoadingOverlay";

const App = (props: any) => {
  const loadingOverlay = useLoadingOverlay();
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <h1>Kwaish App</h1>
    </Container>
  );
};

export default App;
