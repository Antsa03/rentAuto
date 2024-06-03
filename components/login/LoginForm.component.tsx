import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Link from "next/link";
import { Control, Controller } from "react-hook-form";

type LoginFormComponentProps = {
  control: Control<Login>;
  onFinish: (values: any) => void;
  handleForgetPassword: () => void;
  setShowModal: Function;
};

function LoginFormComponent({
  control,
  onFinish,
  handleForgetPassword,
  setShowModal,
}: LoginFormComponentProps) {
  return (
    <>
      <h1 className="text-center mb-4 text-xl font-extrabold text-gray-600">
        Authentification
      </h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Controller
          control={control}
          name="email"
          rules={{ required: "S'il vous plait, entrez votre email!" }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              name="email"
              help={error ? error.message : ""}
              validateStatus={error ? "error" : "success"}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email *"
                {...field}
              />
            </Form.Item>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: "S'il vous plait, entrez votre mot de passe!" }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              help={error ? error.message : ""}
              validateStatus={error ? "error" : "success"}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Mot de passe *"
                {...field}
              />
            </Form.Item>
          )}
        />

        <Form.Item>
          <button onClick={handleForgetPassword} type="button">
            <Link href="">Mot de passe oublié?</Link>
          </button>
        </Form.Item>
        <Form.Item className="text-center">
          <button
            type="submit"
            className="text-white bg-customBlue hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Se connecter
          </button>
        </Form.Item>
        <Form.Item className="text-center">
          <p className="text-[14px]">Vous n'avez pas encore de compte ?</p>
          <Link
            href="/register"
            className="text-blue-600 font-bold"
            onClick={() => setShowModal(false)}
          >
            S'inscrir maintenant
          </Link>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginFormComponent;
