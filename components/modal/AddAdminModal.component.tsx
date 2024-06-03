import React, { useState } from "react";
import { Form, Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { Utilisateur } from "@prisma/client";
import { uploadImg } from "@/utils/uploadImage";
import { showSwal } from "@/lib/showSwal";
import { useCreate } from "@/hooks/useCreate.hook";
import AddButton from "../ui/AddButton.component";
import UserInfo from "../register/UserInfo.component";
import { useQueryClient } from "react-query";
import ModalTitle from "../ui/ModalTitle.component";
import ModalFooter from "../ui/ModalFooter.component";
import UtilisateurType from "@/types/utilisateur.type";

function AddAdminModal() {
  const [open, setOpen] = useState(false);

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
      confirm_password: "",
      isAdmin: true,
    },
  });

  const create_utilisateur = useCreate<Utilisateur>(
    "/api/utilisateur/create",
    () => {
      showSwal("Information", "Utilisateur créé avec succès", "success");
      queryClient.invalidateQueries("utilisateurs");
      utilisateur_form.reset();
      setOpen(false);
    }
  );

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
  const handleSubmitUser: SubmitHandler<UtilisateurType> = async (user) => {
    try {
      if (file) {
        let imageUrl = await uploadingImg();
        user.photo_profil = imageUrl || "user.png";
      }
      await create_utilisateur.handleAdd(user);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async () => {
    await utilisateur_form.handleSubmit(handleSubmitUser)();
  };

  const onCancel = () => {
    utilisateur_form.reset();
    setOpen(false);
  };

  return (
    <>
      <AddButton title="Ajout d'administrateur" setOpen={setOpen} />
      <Modal
        title={<ModalTitle title="Ajout d'administrateur" />}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
          onCancel();
        }}
        width={800}
        className="my-[1%]"
        footer={null}
      >
        <Form layout="vertical" className="m-auto" onSubmitCapture={onFinish}>
          <UserInfo
            isUpdate={false}
            control={utilisateur_form.control}
            setFile={setFile}
          />
          <ModalFooter
            isValid={utilisateur_form.formState.isValid}
            onCancel={onCancel}
          />
        </Form>
      </Modal>
    </>
  );
}

export default AddAdminModal;
