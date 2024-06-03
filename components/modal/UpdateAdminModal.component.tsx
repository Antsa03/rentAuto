import React, { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { Utilisateur } from "@prisma/client";
import { uploadImg } from "@/utils/uploadImage";
import { showSwal } from "@/lib/showSwal";
import UserInfo from "../register/UserInfo.component";
import { useUpdate } from "@/hooks/useUpdate.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQueryClient } from "react-query";
import ModalTitle from "../ui/ModalTitle.component";
import ModalFooter from "../ui/ModalFooter.component";
import UtilisateurType from "@/types/utilisateur.type";

type UpdateAdminModalProps = {
  utilisateur: Utilisateur;
};

function UpdateAdminModal({ utilisateur }: UpdateAdminModalProps) {
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
      isAdmin: true,
    },
  });

  const update_utilisateur = useUpdate<Utilisateur>(
    `/api/admin/utilisateur/update/${utilisateur.id_utilisateur}`,
    () => {
      showSwal("Information", "Utilisateur modifié avec succès", "success");
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
  const handleSubmitUser: SubmitHandler<Utilisateur> = async (user) => {
    try {
      if (file) {
        let imageUrl = await uploadingImg();
        user.photo_profil = imageUrl || "user.png";
      }
      await update_utilisateur.handleUpdate(user);
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

  useEffect(() => {
    utilisateur_form.reset(utilisateur);
  }, [utilisateur]);

  return (
    <>
      <button
        className="w-[50px] text-3xl text-white rounded-lg bg-yellow-500 hover:bg-yellow-700 mr-1 p-2"
        onClick={() => setOpen(true)}
      >
        <Icon icon="ion:create" />
      </button>
      <Modal
        title={<ModalTitle title="Modifier administrateur" />}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => onCancel()}
        width={800}
        className="my-[1%]"
        footer={null}
      >
        <Form layout="vertical" onSubmitCapture={onFinish}>
          <UserInfo
            isUpdate
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

export default UpdateAdminModal;
