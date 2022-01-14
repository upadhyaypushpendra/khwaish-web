import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, PaletteMode } from "@mui/material";
import { Close } from "@mui/icons-material";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { getThemeDesign } from "../theme";
import { LoadingOverlayProvider } from "../components/LoadingOverlay";
import App from "./App";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";
import SessionProvider from "../components/SessionProvider";
import Session from "../utils/Session";
import { useStore } from "../store";
import shallow from "zustand/shallow";
import { ChatsSubSection, FndSubSection, ProfileSubSection, RequestsSubSection, Section, SubSection } from "../types";

const Screens = () => {
    const navigate = useNavigate();
    const [theme] = useStore((state) => [state.theme], shallow);
    const [setSection, setSubSection] = useStore((state) => [state.setSection, state.setSubSection], shallow);

    // Update the theme only if the theme changes
    const muiTheme = React.useMemo(() => createTheme(getThemeDesign(theme)), [theme]);

    const notistackRef: React.RefObject<SnackbarProvider> = React.createRef();

    const onClickDismiss = (key: SnackbarKey) => () => {
        notistackRef?.current?.closeSnackbar(key);
    };

    /**
    * Effect to check is logged in and redirect accordingly
    */
    React.useEffect(() => {
        if (!Session.isLoggedIn()) {
            navigate("/signin");
        }
    }, []);

    /**
    * Effect to store the section into session storage
    */
    React.useEffect(() => {
        const unsubscribeSection = useStore.subscribe(async (section: Section) => {
            if (section === Section.requests) setSubSection(RequestsSubSection.received);
            if (section === Section.chats) setSubSection(ChatsSubSection.list);
            if (section === Section.find) setSubSection(FndSubSection.find);
            if (section === Section.profile) setSubSection(ProfileSubSection.profile);
            sessionStorage.setItem('section', section);
        }, state => state.section);

        return unsubscribeSection;
    }, []);

    /**
    * Effect to store the section into session storage
    */
    React.useEffect(() => {
        const unsubscribeSubSection = useStore.subscribe(async (subSection: SubSection) => {
            sessionStorage.setItem('subSection', subSection);
        }, state => state.subSection);

        return unsubscribeSubSection;
    }, []);

    /**
    * Effect to load sections and subsection from session storage
    */
    React.useEffect(() => {
        const section = sessionStorage.getItem('section');
        if (Boolean(section)) setSection(section as Section);
        const subSection = sessionStorage.getItem('subSection');
        if (Boolean(subSection)) setSubSection(subSection as SubSection);

    }, []);

    return (
        <ThemeProvider theme={muiTheme}>
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
                        <Routes>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/reset-password" element={<ForgotPassword />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </SessionProvider>
                </SnackbarProvider>
            </LoadingOverlayProvider>
        </ThemeProvider>
    );
};

export default Screens;
