import React from "react";
import { isAuthenticated } from "./cookie_alive";
import { Navigate, useLocation } from "react-router";

function RouteProtector({ children }) {
  const isLogged = isAuthenticated();
  const location = useLocation(); // React Router's hook to get the current path

  const protectedRoutes = [
    // "/products",
    // "/category",
    "/cart",
    "/checkout",
    "/my-account",
    "/admin"
  ];

  // Check if the current path matches any protected route
  const isProtectedRoute = protectedRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  // If not logged in and on a protected route, redirect to home
  if (!isLogged && isProtectedRoute) {
    return <Navigate to="/login" replace />;
  }
  if (isLogged && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render children
  return <>{children}</>;
}

export default RouteProtector;
