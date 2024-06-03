"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ModalFooter from "../ui/ModalFooter.component";
import ModalTitle from "../ui/ModalTitle.component";
import { signOut, useSession } from "next-auth/react";
import { useUpdate } from "@/hooks/useUpdate.hook";
import { showSwal } from "@/lib/showSwal";

interface ChangePassword {
  old_password: string;
  password: string;
  confirm_password: string;
}

function UpdatePasswordModal() {
  const { data: session }: any = useSession();
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm<ChangePassword>({
    mode: "all",
  });

  const update_password = useUpdate<ChangePassword>(
    `/api/reset-password/${session?.email}`,
    () => {
      showSwal(
        "Information",
        "Votre mot de passe a été modifié avec succès",
        "success"
      );
      reset();
      signOut();
      setOpen(false);
    }
  );

  const handleSubmitChangePassword: SubmitHandler<ChangePassword> = async (
    passwordProps
  ) => {
    try {
      await update_password.handleUpdate(passwordProps);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async () => {
    await handleSubmit(handleSubmitChangePassword)();
  };

  const onCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <>
      <button
        className="flex flex-row items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Icon icon="ic:baseline-password" className="text-xl" />
        <span>Mot de passe</span>
      </button>
      <Modal
        title={<ModalTitle title="Modifier mot de passe" />}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => onCancel()}
        width={600}
        className="my-[1%]"
        footer={null}
      >
        <Form layout="vertical" onSubmitCapture={onFinish}>
          <Controller
            name="old_password"
            control={control}
            rules={{
              required: "L'ancien mot de passe est obligatoire!",
              validate: async (value: string) => {
                const isValid = await bcrypt.compare(
                  value,
                  session?.utilisateur?.password
                );
                return isValid ? true : "Mot de passe incorrecte";
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Ancien mot de passe"
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Input.Password {...field} />
              </Form.Item>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Le mot de passe est obligatoire!",
              minLength: { value: 8, message: "Minimum 8 caractères" },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Mot de passe"
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Input.Password {...field} />
              </Form.Item>
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            rules={{
              required: "La confirmation de mot de passe est obligatoire!",
              minLength: { value: 8, message: "Minimum 8 caractères" },
              validate: (value: string) => {
                if (value !== control._getWatch("password")) {
                  return "Les mots de passe saisis ne sont pas identiques";
                }
                return true; // Validation réussie
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Confirmation de mot de passe"
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Input.Password {...field} />
              </Form.Item>
            )}
          />
          <ModalFooter isValid={formState.isValid} onCancel={onCancel} />
        </Form>
      </Modal>
    </>
  );
}

export default UpdatePasswordModal;
