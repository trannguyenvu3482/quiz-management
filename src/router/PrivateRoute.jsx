import _ from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const account = useSelector((state) => state.users.account);
  const isAuth = useSelector((state) => state.users.isAuthenticated);

  return isAuth ? <Component {...rest} /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
