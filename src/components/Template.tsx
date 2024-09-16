import React, { ReactNode } from "react";
import { IinitialState } from "../utils/interface";
import { useSelector } from "react-redux";
import LoginPage from "../pages/Login";

const Template: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useSelector((state: IinitialState) => state.auth);
  return auth.isAuth ? <div>{children}</div> : <LoginPage />;
};

export default Template;
