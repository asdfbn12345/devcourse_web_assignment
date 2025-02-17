import React from "react";
import Title from "components/common/Title";
import InputText from "components/common/InputText";
import Button from "components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignUpStyle } from "./SignUp";
import { useAuth } from "hooks/useAuth";

export interface ResetPasswordProps {
  email: string;
  password: string;
}

function ResetPassword() {
  const { userResetPassword, userResetRequest, resetRequested } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>();

  const onSubmit = (data: ResetPasswordProps) => {
    if (resetRequested) {
      userResetPassword(data);
    } else {
      userResetRequest(data);
    }
  };

  return (
    <>
      <Title size="large">Reset password</Title>
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
          {resetRequested && (
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
          )}
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequested ? "Reset password" : "Request reset"}
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

export default ResetPassword;
