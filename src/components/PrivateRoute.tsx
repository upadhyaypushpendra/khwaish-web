import React from "react";
import { bool, string } from "prop-types";
import {
  Route,
  Navigate,
  PathRouteProps,
  LayoutRouteProps,
  IndexRouteProps
} from "react-router-dom";
import Session from "../utils/Session";

function PrivateRoute(
  props: PathRouteProps | LayoutRouteProps | IndexRouteProps
) {
  return Session.isLoggedIn() ? (
    <Route {...props} />
  ) : (
    <Navigate replace to="/signin" />
  );
}

export default PrivateRoute;
