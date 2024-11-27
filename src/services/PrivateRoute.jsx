import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user !== requiredRole) {
    return <h3>Access Denied</h3>;
  }

  return children;
};

export default PrivateRoute;
