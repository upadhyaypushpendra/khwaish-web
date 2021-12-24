import React from "react";
import shallow from "zustand/shallow";
import { bool, string } from "prop-types";
import { Route, Redirect } from "react-router-dom";
import useStore from "./../store";

function PrivateRoute({ path, component: Component, exact }: any) {
  const [isLoggedIn] = useStore((state) => [state.isLoggedIn], shallow);

  console.log("Navigating to : ", path);

  return isLoggedIn ? (
    <Route path={path} element={Component} />
  ) : (
    <Redirect to="/" />
  );
}

PrivateRoute.defaultProps = {
  path: "",
  component: null,
  exact: false
};

PrivateRoute.propTypes = {
  path: string,
  component: Node,
  exact: bool
};

export default PrivateRoute;
