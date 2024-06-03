"use client";
import ClientInfo from "@/components/register/ClientInfo.component";
import UserInfo from "@/components/register/UserInfo.component";
import UtilisateurType from "@/types/utilisateur.type";
import { Client } from "@prisma/client";
import { Form, Space } from "antd";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type AddClientComponentProps = {
  onFinish: () => void;
  onCancel: () => void;
  confirm_password: string;
  setFile: Function;
  setConfirm_password: Function;
  utilisateur_form: UseFormReturn<UtilisateurType>;
  client_form: UseFormReturn<Client>;
};

function AddClientComponent({
  onFinish,
  onCancel,
  confirm_password,
  setFile,
  setConfirm_password,
  utilisateur_form,
  client_form,
}: AddClientComponentProps) {
  return (
    <>
      <Form
        labelCol={{ span: 14 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        className="m-auto"
        onFinish={onFinish}
      >
        <UserInfo
          isUpdate={false}
          control={utilisateur_form.control}
          setFile={setFile}
        />
        <ClientInfo control={client_form.control} />
        <Form.Item>
          <Space>
            <button
              className="h-10 px-6 font-semibold rounded-md bg-green-500 hover:bg-green-700 text-white"
              type="submit"
            >
              Ok
            </button>
            <button
              type="button"
              className="h-10 px-6 font-semibold rounded-md bg-red-500 hover:bg-red-700 text-white"
              onClick={() => onCancel()}
            >
              Annuler
            </button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddClientComponent;
