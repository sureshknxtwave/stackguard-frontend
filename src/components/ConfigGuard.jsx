import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ConfigGuard() {
  const { hasConfig, loading } = useAuth();
  if (loading) return null;
  return hasConfig ? <Outlet /> : <Navigate to="/config" replace />;
}
