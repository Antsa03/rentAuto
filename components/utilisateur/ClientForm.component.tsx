"use client";
import ClientInfo from "@/components/register/ClientInfo.component";
import UserInfo from "@/components/register/UserInfo.component";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Client } from "@prisma/client";
import { Form } from "antd";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import ModalFooter from "../ui/ModalFooter.component";
import UtilisateurType from "@/types/utilisateur.type";

type AddClientComponentProps = {
  isUpdate: boolean;
  isValid: boolean;
  isValidUtilisateurForm: boolean;
  onFinish: () => void;
  onCancel: () => void;
  setFile: Function;
  utilisateur_form: UseFormReturn<UtilisateurType>;
  client_form: UseFormReturn<Client>;
  isSuivant: Boolean;
  setIsSuivant: (arg: boolean) => void;
};

function ClientFormComponent({
  isSuivant,
  setIsSuivant,
  isUpdate,
  isValid,
  isValidUtilisateurForm,
  onFinish,
  onCancel,
  setFile,
  utilisateur_form,
  client_form,
}: AddClientComponentProps) {
  return (
    <>
      <Form layout="vertical" className="" onSubmitCapture={onFinish}>
        <div className={`${isSuivant ? "hidden" : ""}`}>
          <UserInfo
            isUpdate={isUpdate}
            control={utilisateur_form.control}
            setFile={setFile}
          />
          <button
            type="button"
            className={`focus:outline-none text-white bg-customBlue hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-1 items-center ml-auto ${
              isValidUtilisateurForm ? "" : "cursor-not-allowed opacity-50"
            }`}
            disabled={!isValidUtilisateurForm}
            onClick={() => setIsSuivant(true)}
          >
            <span>Suivant</span>{" "}
            <Icon icon="carbon:next-outline" className="text-xl" />
          </button>
        </div>
        <div className={`${isSuivant ? "" : "hidden"}`}>
          <ClientInfo control={client_form.control} />
          <button
            type="button"
            className="focus:outline-none text-white bg-customBlue hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-1 items-center"
            onClick={() => setIsSuivant(false)}
          >
            <Icon icon="carbon:previous-outline" className="text-xl" />
            <span>Précédent</span>
          </button>
        </div>

        {isSuivant && <ModalFooter isValid={isValid} onCancel={onCancel} />}
      </Form>
    </>
  );
}

export default ClientFormComponent;
