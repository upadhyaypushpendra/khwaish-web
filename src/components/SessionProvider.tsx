import React from "react";
import shallow from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useStore } from "../store";

import { useLoadingOverlay } from "./LoadingOverlay";
import { restoreSession, signIn, signOut } from "../services/auth";
import Session from "../utils/Session";
import { subMinutes } from "../utils";

function SessionProvider({ children }: any) {
    const loadingOverlay = useLoadingOverlay();

    const snackbar = useSnackbar();

    const navigate = useNavigate();

    const [reset] = useStore((state) => [state.reset], shallow);

    const isTokenExpiring = () =>
        subMinutes(new Date(Session.accessTokenExpiry), 5) <= new Date();

    const isRefreshTokenExpiring = () => {
        return subMinutes(new Date(Session.refreshTokenExpiry), 5) <= new Date();
    }

    const goToSignIn = async () => {
        await signOut();
        reset();
        navigate("/signin");
    };

    const checkRemembered = async () => {
        try {
            const isRemeberedResult = Session.isRemembered();
            if (isRemeberedResult !== false) {
                await signIn(isRemeberedResult);
                return true;
            }
        } catch (error) {
            console.log('DEBUG::checkRemembered: failed', error);
            return false;
        }
    };

    async function onLoad() {
        loadingOverlay.showLoadingOverlay("Setting up Kwaish for you...");

        try {
            // if the refresh token is expiring then sign out and redirect to sign in
            const khwaishRefreshTokenExpiry = localStorage.getItem(
                "khwaishRefreshTokenExpiry"
            );

            if (khwaishRefreshTokenExpiry) {
                const refreshTokenExpiryTime = new Date(parseInt(khwaishRefreshTokenExpiry, 10)).getTime();
                Session.refreshTokenExpiry =
                    refreshTokenExpiryTime <= new Date().getTime() ? new Date().getTime() : refreshTokenExpiryTime;
            }

            if (isRefreshTokenExpiring()) {
                await goToSignIn();
            }

            if (Session.isLoggedIn()) {
                if (isTokenExpiring()) Session.accessToken = "";

                await restoreSession();

                navigate("/");

                loadingOverlay.hideLoadingOverlay();
            } else {
                // Check for remember me
                const result = await checkRemembered();

                if (result) {
                    navigate("/");
                    return;
                };
            }
        } catch (e) {
            console.log('DEBUG::onLoad error: ', e);
            snackbar.enqueueSnackbar("Uh Oh! You need to sign.", {
                variant: "warning",
                onExited: goToSignIn
            });
        } finally {
            loadingOverlay.hideLoadingOverlay();
        }
    }

    async function setupRefresh() {
        try {
            if (isRefreshTokenExpiring()) {
                await goToSignIn();
            }

            if (Session.isLoggedIn()) {
                if (isTokenExpiring()) Session.refreshToken = "";

                await restoreSession();
            }
        } catch (e) {
            console.error("setupTokenRefresh -> error refreshing token", e);
            await goToSignIn();
        }
    }

    React.useEffect(() => {
        onLoad()
            .then(() => loadingOverlay.hideLoadingOverlay())
            .catch((e) => loadingOverlay.hideLoadingOverlay());

        const timerId = setInterval(setupRefresh, 3600000);

        return () => clearInterval(timerId);
    }, []);

    return <>{children}</>;
}

export default SessionProvider;
