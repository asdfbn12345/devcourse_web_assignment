import React from "react";
import Title from "components/common/Title";
import styled from "styled-components";
import InputText from "components/common/InputText";
import Button from "components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, signUp } from "api/auth.api";
import { useAlert } from "hooks/useAlert";
import { SignUpStyle } from "./SignUp";
import { useAuthStore } from "store/autStore";

export interface LoginProps {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    login(data).then((res) => {
      storeLogin(res.token);

      showAlert("Login success.");
      navigate("/");
    });
  };

  return (
    <>
      <Title size="large">Login</Title>
      <SignUpStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="email"
              inputType="email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <p className="error-text">Email cannot be empty.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="password"
              inputType="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="error-text">Password cannot be empty.</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              Login
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">Reset password</Link>
          </div>
        </form>
      </SignUpStyle>
    </>
  );
}

export default Login;
