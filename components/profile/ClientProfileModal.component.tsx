"use client";
import ModalTitle from "@/components/ui/ModalTitle.component";
import ClientFormComponent from "@/components/utilisateur/ClientForm.component";
import { useUpdate } from "@/hooks/useUpdate.hook";
import { showSwal } from "@/lib/showSwal";
import UtilisateurType from "@/types/utilisateur.type";
import { uploadImg } from "@/utils/uploadImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Client, Utilisateur } from "@prisma/client";
import { Modal } from "antd";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

function ClientProfileModal() {
  const { data: session }: any = useSession();
  const [open, setOpen] = useState(false);

  //Pagination du formulaire
  const [isSuivant, setIsSuivant] = useState(false);

  const queryClient = useQueryClient();

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

  //Utilisation du hook pour la mise à jour de l'utilisateur
  const update_utilisateur = useUpdate<Utilisateur>(
    `/api/utilisateur/update/${session?.utilisateur.id_utilisateur}`
  );

  //Pour gérer la formulaire client
  const client_form = useForm<Client>({
    mode: "all",
    defaultValues: {
      permis_de_conduire: "",
      num_cin: "",
      date_de_naissance: undefined,
    },
  });

  const update_client = useUpdate<Client>(
    `/api/utilisateur/client/update/${session?.id_client}`,
    () => {
      showSwal(
        "Information",
        "Votre profile a été modifié avec succès",
        "success"
      );
      signOut();
      queryClient.invalidateQueries("clients");
    }
  );

  const handleSubmitClient: SubmitHandler<Client> = async (client) => {
    try {
      await update_client.handleUpdate(client);
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
  const handleSubmitUser: SubmitHandler<Utilisateur> = async (utilisateur) => {
    try {
      if (file) {
        let imageUrl = await uploadingImg();
        utilisateur.photo_profil = imageUrl || "user.png";
      }
      // const updatedUserData = await create_utilisateur.handleAdd(user);
      await update_utilisateur.handleUpdate(utilisateur);
      await client_form.handleSubmit(handleSubmitClient)();
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async () => {
    await utilisateur_form.handleSubmit(handleSubmitUser)();
    utilisateur_form.reset();
    client_form.reset();
    setOpen(false);
  };

  const oncancel = () => {
    utilisateur_form.control._reset();
    client_form.reset();
    setOpen(false);
  };

  useEffect(() => {
    utilisateur_form.reset(session?.utilisateur);
    client_form.reset(session?.client);
  }, [session]);
  return (
    <>
      <button
        className="flex flex-row items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Icon icon="iconamoon:profile-fill" className="text-xl" />
        <span>Profile</span>
      </button>
      <Modal
        title={<ModalTitle title="Profile" />}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={700}
        footer={null}
      >
        <ClientFormComponent
          isSuivant={isSuivant}
          setIsSuivant={setIsSuivant}
          isUpdate
          isValidUtilisateurForm={utilisateur_form.formState.isValid}
          isValid={client_form.formState.isValid}
          onFinish={onFinish}
          onCancel={oncancel}
          setFile={setFile}
          utilisateur_form={utilisateur_form}
          client_form={client_form}
        />
      </Modal>
    </>
  );
}

export default ClientProfileModal;
