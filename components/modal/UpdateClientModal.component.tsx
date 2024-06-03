import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import ClientType from "@/types/Client.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { Client, Utilisateur } from "@prisma/client";
import { uploadImg } from "@/utils/uploadImage";
import { showSwal } from "@/lib/showSwal";
import ClientFormComponent from "../utilisateur/ClientForm.component";
import { useUpdate } from "@/hooks/useUpdate.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQueryClient } from "react-query";
import ModalTitle from "../ui/ModalTitle.component";
import UtilisateurType from "@/types/utilisateur.type";

type UpdateClientModalProps = {
  client: ClientType;
};

export default function UpdateClientModal({ client }: UpdateClientModalProps) {
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
    `/api/admin/utilisateur/update/${client.id_utilisateur}`
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
    `/api/admin/utilisateur/client/update/${client.id_client}`,
    () => {
      showSwal("Information", "Le client a été modifié avec succès", "success");
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
    setIsSuivant(false);
  };

  const oncancel = () => {
    utilisateur_form.control._reset();
    client_form.reset();
    setOpen(false);
    setIsSuivant(false);
  };

  useEffect(() => {
    utilisateur_form.reset(client.utilisateur);
    client_form.reset(client);
  }, []);

  return (
    <>
      <button
        className="w-[50px] text-3xl text-white rounded-lg bg-yellow-500 hover:bg-yellow-700 mr-1 p-2"
        onClick={() => setOpen(true)}
      >
        <Icon icon="ion:create" />
      </button>
      <Modal
        title={<ModalTitle title="Modifier client" />}
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
