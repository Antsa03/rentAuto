"use client";
import RegisterComponent from "@/components/register/Register.component";
import ClientFormComponent from "@/components/utilisateur/ClientForm.component";
import { useCreate } from "@/hooks/useCreate.hook";
import { showSwal } from "@/lib/showSwal";
import UtilisateurType from "@/types/utilisateur.type";
import { uploadImg } from "@/utils/uploadImage";
import { Client, Utilisateur } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

function RegisterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  //Variable pour récupérer le donnée utilisateur
  let data: Utilisateur;

  //Pagination du formulaire
  const [isSuivant, setIsSuivant] = useState(false);

  // Pour gérer la formulaire de l'utilisateur
  const utilisateur_form = useForm<UtilisateurType>({
    mode: "all",
    defaultValues: {
      nom: "",
      prenom: "",
      genre: "",
      adresse: "",
      email: "",
      password: "",
      isAdmin: false,
    },
  });

  //Pour gérer la formulaire client
  const client_form = useForm<Client>({
    mode: "all",
    defaultValues: {
      id_utilisateur: 0,
      permis_de_conduire: "",
      num_cin: "",
      date_de_naissance: undefined,
    },
  });

  const create_client = useCreate("/api/register/info", () => {
    showSwal("Information", "Le client a été créé avec succès", "success");
    utilisateur_form.reset();
    client_form.reset();
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
        queryClient.invalidateQueries("clients");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async () => {
    await utilisateur_form.handleSubmit(handleSubmitUser)();
    setIsSuivant(false);
  };

  const onCancel = () => {
    utilisateur_form.control._reset();
    client_form.reset();
    setIsSuivant(false);
  };
  useEffect(() => {
    if (session) router.push("/");
  }, [session]);
  return (
    <div className="p-4">
      <div className="w-[70%] mx-auto">
        <ClientFormComponent
          isSuivant={isSuivant}
          setIsSuivant={setIsSuivant}
          isValidUtilisateurForm={utilisateur_form.formState.isValid}
          isValid={client_form.formState.isValid}
          isUpdate={false}
          onFinish={onFinish}
          onCancel={onCancel}
          setFile={setFile}
          utilisateur_form={utilisateur_form}
          client_form={client_form}
        />
      </div>
    </div>
  );
}

export default RegisterPage;
