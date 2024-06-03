"use client";
import UserInfo from "@/components/register/UserInfo.component";
import { useCreate } from "@/hooks/useCreate.hook";
import { showSwal } from "@/lib/showSwal";
import { uploadImg } from "@/utils/uploadImage";
import { Client, Utilisateur } from "@prisma/client";
import { Button, Form, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClientInfo from "./ClientInfo.component";
import UtilisateurType from "@/types/utilisateur.type";

function RegisterComponent() {
  //Variable pour récupérer le donnée utilisateur
  let data: Utilisateur;
  //Variable pour rediriger la page
  const router = useRouter();
  //Variable de confirmation mot de passe
  const [confirm_password, setConfirm_password] = useState("");

  // Pour gérer la formulaire de l'utilisateur
  const utilisateur_form = useForm<UtilisateurType>({
    mode: "all",
  });

  //Pour gérer la formulaire client
  const client_form = useForm<Client>({
    defaultValues: {
      permis_de_conduire: "",
      num_cin: "",
      date_de_naissance: undefined,
    },
  });

  const create_client = useCreate("/api/register/info", () => {
    showSwal("Information", "Votre compte a été créé avec succès", "success");
    router.push("/");
  });

  const handleSubmitClient: SubmitHandler<Client> = async (client) => {
    try {
      if (data) {
        client.id_utilisateur = data.id_utilisateur;
        await create_client.handleAdd(client);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Variable pour stocker le fichier image
  const [file, setFile] = useState<File>();

  //Logique d'upload de fichier
  const uploadingImg = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      let fileType = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/svg",
        "image/gif",
        "image/webp",
        "image/apng",
        "image/heic",
        "image/heic",
        "image/bmp",
        "image/tiff",
        "image/tif",
        "image/pp2",
      ];
      if (!fileType.includes(file.type)) {
        alert("Le type de fichier n'est pas pris en charge.");
      }

      if (file.size > 4 * 1024 * 1024) {
        alert("La taille du fichier ne doit pas dépasser 4 Mo.");
      }

      if (file.size === 0) {
        alert("Pas de fichier choisi");
        return;
      }
      const url = await uploadImg(formData);
      let splitUrl = url.split(
        "https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/"
      );
      return splitUrl[1];
    }
  };

  //Finaliser le requête
  const handleSubmitUser: SubmitHandler<Utilisateur> = async (user) => {
    try {
      if (file) {
        let imageUrl = await uploadingImg();
        user.photo_profil = imageUrl || "user.png";
      }
      // const updatedUserData = await create_utilisateur.handleAdd(user);
      const response = await fetch("/api/register/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        data = await response.json();
        await client_form.handleSubmit(handleSubmitClient)();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async () => {
    await utilisateur_form.handleSubmit(handleSubmitUser)();
  };

  return (
    <main className="p-4">
      <h1 className="text-customBlue text-3xl font-bold mb-4">
        Formulaire d'inscription
      </h1>
      <Form layout="vertical" className="w-full p-4" onSubmitCapture={onFinish}>
        <div className="flex gap-5 w-full">
          <div className="w-full border rounded-lg shadow-xl p-2">
            <UserInfo
              isUpdate={false}
              control={utilisateur_form.control}
              setFile={setFile}
            />
          </div>
          <div className="w-full h-fit border rounded-lg shadow-xl p-2">
            <ClientInfo control={client_form.control} />
            <div className="w-full text-center mt-4">
              <Space size="large">
                <Button type="default" htmlType="submit">
                  Confirmer
                </Button>
                <Link href="/" className="ml-2">
                  <Button htmlType="button">Annuler</Button>
                </Link>
              </Space>
            </div>
          </div>
        </div>
      </Form>
    </main>
  );
}

export default RegisterComponent;
