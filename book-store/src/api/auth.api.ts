import { SignUpProps } from "pages/SignUp";
import { httpClient } from "./http";

export const signUp = async (userData: SignUpProps) => {
  const response = await httpClient.post("/users/join", userData);

  return response.data;
};
