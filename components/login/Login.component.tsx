"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import LoginFormComponent from "@/components/login/LoginForm.component";
import isEmailValid from "@/utils/verifyEmail";
import { showSwal } from "@/lib/showSwal";
import ResetPasswordComponent from "@/components/login/ResetPassword.component";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginPageProps = {
  setShowModal: Function;
};

function LoginPage({ setShowModal }: LoginPageProps) {
  const { control, handleSubmit, watch, reset } = useForm<Login>({
    mode: "all",
  });

  const handleSubmitLogin: SubmitHandler<Login> = async (login) => {
    try {
      const res = await signIn("credentials", {
        email: login.email,
        password: login.password,
        redirect: false,
      });
      if (res?.ok) {
        setShowModal(false);
      }
      if (res?.error) {
        showSwal("Information", "Email ou mot de passe invalide", "error");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async () => {
    await handleSubmit(handleSubmitLogin)();
  };

  //Logique du mot de passe oublié
  const [showResetPassword, setShowResetPassword] = useState<Boolean>(false);
  const handleForgetPassword = () => {
    if (watch("email") === "")
      return showSwal(
        "Information",
        "Veuillez entrer votre adresse email",
        "error"
      );
    else {
      if (!isEmailValid(control._getWatch("email")))
        return showSwal("Information", "Adresse email invalide", "error");
      setShowResetPassword(true);
    }
  };
  return (
    <div className="">
      {showResetPassword ? (
        <ResetPasswordComponent
          email={control._getWatch("email")}
          setShowResetPassword={setShowResetPassword}
          reset={reset}
        />
      ) : (
        <LoginFormComponent
          control={control}
          handleForgetPassword={handleForgetPassword}
          onFinish={onFinish}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default LoginPage;
