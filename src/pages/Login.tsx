import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IinitialState } from "../utils/interface";
import { useMutation } from "react-query";
import { saveUserInfo } from "../libs/fetcher";
import { authActions } from "../store/auth";

const LoginPage: React.FC = () => {
  const auth = useSelector((state: IinitialState) => state.auth);
  const dispatch = useDispatch();
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  const saveUser = useMutation((token: string) => saveUserInfo(token), {
    onSuccess: async () => {},
  });

  useEffect(() => {
    if (isAuthenticated && !auth?.isAuth) {
      const fetchTokens = async () => {
        // Get ID token
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims?.__raw; // The raw ID token
        if (idToken) {
          saveUser.mutate(idToken); // Save user info
        }

        // Get the Access Token
        const accessToken = await getAccessTokenSilently();
        dispatch(
          authActions.login({
            isAuth: isAuthenticated,
            accessToken: accessToken,
            user: user,
          })
        );
      };

      // Fetch tokens only once when authenticated
      fetchTokens();
    }
  }, [
    isAuthenticated,
    auth?.isAuth,
    getAccessTokenSilently,
    getIdTokenClaims,
    saveUser,
    dispatch,
    user,
  ]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        {/* Welcome Text */}
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Welcome to Our 4-ti
        </h1>

        {/* Login Button */}
        <button
          onClick={() => loginWithRedirect()}
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
