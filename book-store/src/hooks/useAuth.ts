import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { LoginProps } from "pages/Login";
import { login, resetPassword, resetRequest, signUp } from "api/auth.api";
import { useAuthStore } from "store/autStore";
import { SignUpProps } from "pages/SignUp";
import { ResetPasswordProps } from "pages/ResetPassword";
import { useState } from "react";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
  const [resetRequested, setResetRequested] = useState(false);

  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token);

        showAlert("Login success.");
        navigate("/");
      },
      (error) => {
        showAlert("Login failed.");
      }
    );
  };

  const userSignUp = (data: SignUpProps) => {
    signUp(data).then((res) => {
      showAlert("Success to sign up.");
      navigate("/login");
    });
  };

  const userResetPassword = (data: ResetPasswordProps) => {
    resetPassword(data).then(() => {
      showAlert("Password has been reset.");
      navigate("/login");
    });
  };

  const userResetRequest = (data: ResetPasswordProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  return {
    userLogin,
    userSignUp,
    userResetRequest,
    userResetPassword,
    resetRequested,
  };
};
