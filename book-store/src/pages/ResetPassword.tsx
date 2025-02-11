import React, { ChangeEvent, useState } from "react";
import Title from "components/common/Title";
import InputText from "components/common/InputText";
import Button from "components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword, resetRequest, signUp } from "api/auth.api";
import { useAlert } from "hooks/useAlert";
import { SignUpStyle } from "./SignUp";

export interface ResetPasswordProps {
  email: string;
  password: string;
}

function ResetPassword() {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [resetRequested, setResetRequested] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>();

  const onSubmit = (data: ResetPasswordProps) => {
    if (resetRequested) {
      resetPassword(data).then(() => {
        showAlert("Password has been reset.");
        navigate("/login");
      });
    } else {
      resetRequest(data).then(() => {
        setResetRequested(true);
      });
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
