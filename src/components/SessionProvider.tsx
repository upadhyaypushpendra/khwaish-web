import React from "react";
import shallow from "zustand/shallow";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useStore } from "../store";

import LoadingOverlay, { useLoadingOverlay } from "./LoadingOverlay";
import { restoreSession, signOut } from "../services/auth";
import Session from "../utils/Session";
import { subMinutes } from "../utils";

function SessionProvider({ children }: any) {
  const loadingOverlay = useLoadingOverlay();

  const snackbar = useSnackbar();

  const navigate = useNavigate();

  const location = useLocation();

  const [loading, setLoading] = React.useState(true);

  const [reset] = useStore((state) => [state.reset], shallow);

  const isTokenExpiring = () =>
    subMinutes(new Date(Session.accessTokenExpiry), 5) <= new Date();

  const isRefreshTokenExpiring = () =>
    subMinutes(new Date(Session.refreshTokenExpiry), 5) <= new Date();

  const goToSignIn = async () => {
    await signOut();

    navigate(
      location.pathname.indexOf("live-classes") > -1
        ? location.pathname
        : "/signIn"
    );
  };

  async function onLoad() {
    loadingOverlay.showLoadingOverlay("Setting up Kwaish for you...");

    try {
      // if the refresh token is expiring then sign out and redirect to sign in
      const khwaishRefreshTokenExpiry = localStorage.getItem(
        "khwaishRefreshTokenExpiry"
      );

      if (khwaishRefreshTokenExpiry) {
        Session.refreshTokenExpiry =
          new Date(khwaishRefreshTokenExpiry).getTime() || new Date().getTime();
      }

      if (isRefreshTokenExpiring()) {
        await goToSignIn();
      }

      if (Session.isLoggedIn()) {
        if (isTokenExpiring()) Session.accessToken = "";
        await restoreSession()
          .then((result) => {
            snackbar.enqueueSnackbar("Signed In", {
              variant: "success"
            });
          })
          .catch((err) => {
            snackbar.enqueueSnackbar("Uh Oh! You need to sign.", {
              variant: "warning",
              onExited: (e) => navigate("/signin")
            });
            reset();
            navigate("/signin");
          })
          .finally(() => {
            setLoading(false);
            loadingOverlay.hideLoadingOverlay();
          });
      }
    } catch (e) {
      snackbar.enqueueSnackbar("Uh Oh! You need to sign.", {
        variant: "warning",
        onExited: goToSignIn
      });
    } finally {
      setLoading(false);
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
      .then(() => setLoading(false))
      .catch((e) => setLoading(false));

    const timerId = setInterval(setupRefresh, 3600000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default SessionProvider;
