// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../aip context/auth/useAuth";

const PrivateRoute = ({ children }) => {
    const {auth} = useAuth()

  // If not authenticated, redirect to login page
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected routes
  return children;
};

export default PrivateRoute;
