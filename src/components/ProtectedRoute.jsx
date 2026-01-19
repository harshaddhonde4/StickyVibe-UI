import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/Auth-Context";
import { useEffect } from "react";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/login ") {
      sessionStorage.setItem("redirectPath", location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
