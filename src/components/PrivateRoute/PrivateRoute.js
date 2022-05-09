import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as condition from "../../redux/status";

const PrivateRoute = ({ children }) => {
  const { currentUser, status } = useSelector((state) => state.user);

  if (status !== condition.SUCCEEDED) {
    return <div />;
  }

  return currentUser ? children : <Navigate to="/landing-page" />;
};

export default PrivateRoute;
