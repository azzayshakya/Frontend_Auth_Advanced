import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
    }
  }, [user]);

  return <Navigate to="/login" />;
};

const ProtectedLoginRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export { ProtectedRoute, ProtectedLoginRoute };
