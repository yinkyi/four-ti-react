import axios from "axios";
import store, { RootState } from "../store";
import { authActions } from "../store/auth";
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptors
client.interceptors.request.use(
  async (config) => {
    const state: RootState = store.getState();
    config.headers.authorization = `Bearer ${state.auth.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      store.dispatch(authActions.logout());
    }
    return Promise.reject(error);
  }
);
