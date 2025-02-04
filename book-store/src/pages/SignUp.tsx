import React, { ChangeEvent, useState } from "react";
import Title from "components/common/Title";
import styled from "styled-components";
import InputText from "components/common/InputText";
import Button from "components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "api/auth.api";
import { useAlert } from "hooks/useAlert";

export interface SignUpProps {
  email: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>();

  const onSubmit = (data: SignUpProps) => {
    signUp(data).then((res) => {
      showAlert("Success to sign up.");
      navigate("/login");
    });
  };

  return (
    <>
      <Title size="large">SignUp</Title>
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
              Submit
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

const SignUpStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;
  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default SignUp;
