import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("access");

  return token ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default ProtectedRoute;
