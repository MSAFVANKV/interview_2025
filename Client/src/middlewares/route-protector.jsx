import React from 'react'
import { isAuthenticated } from './cookie_alive'
import { Navigate } from 'react-router';

function RouteProtector({children}) {
    const isLogged = isAuthenticated();

    const protectedRoutes = [
        "/products",
        "/category",
        "/cart",
        "/checkout",
        "/my-account",
      ];

      if (
        !isLogged &&
        protectedRoutes.some((path) => window.location.pathname.startsWith(path)) 
        
      ) {
        return <Navigate to="/" replace />;
      }
      return <>{children}</>;
}

export default RouteProtector