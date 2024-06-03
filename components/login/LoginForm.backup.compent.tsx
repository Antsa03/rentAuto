import React, { ChangeEvent } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Link from "next/link";

type LoginFormComponentProps = {
  user: Login;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFinish: (values: any) => void;
  handleForgetPassword: () => void;
};

function LoginFormComponent({
  user,
  handleInputChange,
  onFinish,
  handleForgetPassword,
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
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "S'il vous plait, entrez votre email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email *"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "S'il vous plait, entrez votre mot de passe!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mot de passe *"
            name="password"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <button onClick={handleForgetPassword} type="button">
            <Link href="">Mot de passe oublié?</Link>
          </button>
        </Form.Item>
        <Form.Item className="text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Se connecter
          </button>
        </Form.Item>
        <Form.Item className="text-center">
          <p className="text-[14px]">Vous n'avez pas encore de compte ?</p>
          <Link href="/register" className="text-blue-600 font-bold">
            S'inscrir maintenant
          </Link>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginFormComponent;
