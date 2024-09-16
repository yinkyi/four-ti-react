import { User } from "@auth0/auth0-react";
import { ReactNode } from "react";

export interface TemplateProps {
  children: ReactNode;
}
export interface IAuth {
  isAuth: boolean;
  accessToken: string | null;
  user?: User;
}

export interface IinitialState {
  auth: IAuth;
}
