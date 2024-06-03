"use client";
import { Form, Input } from "antd";
import React from "react";

interface Update_passwordProps {
  handleSubmit: (values: any) => void;
  setShowResetPassword: Function;
  reset: () => void;
}

function Update_password({
  handleSubmit,
  setShowResetPassword,
  reset,
}: Update_passwordProps) {
  return (
    <div className="p-4">
      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 11 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        className="w-full"
      >
        <Form.Item
          label="Nouveau mot de passe"
          name="password"
          rules={[
            {
              required: true,
              message: "Ce champ est obligatoire",
            },
            {
              min: 8,
              message: "Au moins 8 caractères",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirmer le mot de passe"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Ce champ est obligatoire",
            },
            {
              min: 8,
              message: "Au moins 8 caractères",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <button
          type="submit"
          className="w-full font-bold py-2 px-4 rounded-lg bg-customBlue text-white hover:bg-blue-900 mt-5 text-base"
        >
          Confirmer
        </button>
        <button
          type="button"
          className="w-full font-bold py-2 px-4 rounded-lg bg-red-800 text-white hover:bg-red-600 mt-5 text-base"
          onClick={() => {
            setShowResetPassword(false), reset();
          }}
        >
          Annuler
        </button>
      </Form>
    </div>
  );
}

export default Update_password;
