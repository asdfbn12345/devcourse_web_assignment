import React from "react";
import Title from "components/common/Title";
import InputText from "components/common/InputText";
import Button from "components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignUpStyle } from "./SignUp";
import { useAuth } from "hooks/useAuth";

export interface LoginProps {
  email: string;
  password: string;
}

function Login() {
  const { userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    userLogin(data);
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
              inputMode="email"
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
              inputMode="text"
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
