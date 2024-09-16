import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../utils/interface";

const initialAuthState: IAuth = {
  isAuth: false,
  accessToken: null,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuth = false;
      state.accessToken = null;
      state.user = {};
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
