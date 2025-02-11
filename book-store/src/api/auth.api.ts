import { SignUpProps } from "pages/SignUp";
import { httpClient } from "./http";
import { ResetPasswordProps } from "pages/ResetPassword";

export const signUp = async (userData: SignUpProps) => {
  const response = await httpClient.post("/users/join", userData);

  return response.data;
};

export const resetRequest = async (data: ResetPasswordProps) => {
  const response = await httpClient.post("/users/reset", data);

  return response.data;
};

export const resetPassword = async (data: ResetPasswordProps) => {
  const response = await httpClient.put("/users/reset", data);

  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (data: ResetPasswordProps) => {
  const response = await httpClient.post<LoginResponse>("/users/login", data);

  return response.data;
};
