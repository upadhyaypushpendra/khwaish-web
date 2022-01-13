import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "../components/AppBar";
import Notifications from "../components/Notifications";
import shallow from "zustand/shallow";
import { useStore } from "../store";
import { Section } from "../types";
import FindFriends from "../components/FindFriends";
import Settings from "../components/Settings";
import Chats from "../components/Chats";

const App = () => {
    const [section] = useStore((state) => [state.section], shallow);

    return (
        <Container component="main" style={{ margin: 0, padding: 0, maxWidth: '100%' }}>
            <CssBaseline />
            <AppBar />
            {section === Section.chats && <Chats />}
            {section === Section.requests && <Notifications />}
            {section === Section.profile && <Settings />}
            {section === Section.find && <FindFriends />}
        </Container>
    );
};

export default App;
