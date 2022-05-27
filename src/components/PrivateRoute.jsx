import { Route } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import routes from "../routes";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("confirmLogin");

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
