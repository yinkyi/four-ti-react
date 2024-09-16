// // // requireAuth.tsx
// import React from "react";
// import { useSelector } from "react-redux";
// import { IinitialState } from "./utils/interface";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Navigate } from "react-router-dom";

// interface RequireAuthProps {
//   element: React.ReactElement;
// }

// const RequireAuth: React.FC<RequireAuthProps> = ({ element }) => {
//   const { isAuthenticated, loginWithRedirect } = useAuth0();
//   const isAuth = useSelector((state: IinitialState) => state.auth.isAuth); // Redux state for authentication

//   if (isAuthenticated && isAuth) {
//     // If authenticated both in Auth0 and Redux, allow access
//     return element;
//   } else if (!isAuthenticated) {
//     // If not authenticated in Auth0, redirect to login page
//     loginWithRedirect();
//     return null;
//   }

//   return <Navigate to="/login" replace />; // Fallback in case something fails
// };

// export default RequireAuth;

import React from "react";
import { useSelector } from "react-redux";
import { IinitialState } from "./utils/interface";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  element: React.ReactElement;
}

export const PrivateRoute: React.FC<RequireAuthProps> = ({ element }) => {
  const isAuth = useSelector((state: IinitialState) => state.auth.isAuth);
  return isAuth ? element : <Navigate to="/login" />;
};

export const PublicRoute: React.FC<RequireAuthProps> = ({ element }) => {
  const isAuth = useSelector((state: IinitialState) => state.auth.isAuth);
  return !isAuth ? element : <Navigate to="/" />;
};
