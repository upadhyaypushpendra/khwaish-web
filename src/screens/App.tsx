import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "../components/AppBar";
import Notifications from "../components/Notifications";
import shallow from "zustand/shallow";
import { useStore } from "../store";
import { AppTab } from "../types";
import FindFriends from "../components/FindFriends";
import Settings from "../components/Settings";

const App = () => {
    const [tab] = useStore((state) => [state.tab], shallow);

    return (
        <Container component="main" style={{ margin: 0, padding: 0, maxWidth: '100%' }}>
            <CssBaseline />
            <AppBar />
            {tab === AppTab.chats && <h1>Home</h1>}
            {tab === AppTab.requests && <Notifications />}
            {tab === AppTab.profile && <Settings />}
            {tab === AppTab.find && <FindFriends />}
        </Container>
    );
};

export default App;
