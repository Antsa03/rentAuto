"use client";
import React, { useState } from "react";
import { Form, Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { Vehicule } from "@prisma/client";
import { uploadImg } from "@/utils/uploadImage";
import { showSwal } from "@/lib/showSwal";
import { useCreate } from "@/hooks/useCreate.hook";
import VehiculeForm from "../vehicule/VehiculeForm.component";
import AddButton from "../ui/AddButton.component";
import { useQueryClient } from "react-query";
import ModalTitle from "../ui/ModalTitle.component";

function AddVehiculeModal() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  // Pour gérer la formulaire de l'utilisateur
  const vehicule_form = useForm<Vehicule>({
    mode: "all",
  });

  // Variable pour stocker le fichier image
  const [file, setFile] = useState<File | null>(null);

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

  const create_vehicule = useCreate<Vehicule>(
    "/api/admin/vehicule/create",
    () => {
      showSwal("Information", "Le véhicule a été créé avec succès", "success");
      queryClient.invalidateQueries("vehicules");
      vehicule_form.reset();
      form.resetFields();
      setOpen(false);
    }
  );

  const handleSubmitVehicule: SubmitHandler<Vehicule> = async (vehicule) => {
    try {
      if (file) {
        let imageUrl = await uploadingImg();
        vehicule.image_vehicule = imageUrl || "";
        await create_vehicule.handleAdd(vehicule);
      } else {
        showSwal("Erreur", "Veuillez entrer l'image du véhicule", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Finaliser le requête
  const [form] = Form.useForm();
  const onFinish = async () => {
    await vehicule_form.handleSubmit(handleSubmitVehicule)();
    if (create_vehicule.error) {
      showSwal("Erreur", "L'immatriculation existe déjà", "error");
    }
  };

  const oncancel = () => {
    vehicule_form.reset();
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <AddButton title="Ajout de véhicule" setOpen={setOpen} />
      <Modal
        title={<ModalTitle title="Ajout de véhicule" />}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
          oncancel();
        }}
        width={800}
        className="my-[1%]"
        footer={null}
      >
        <VehiculeForm
          onFinish={onFinish}
          onCancel={oncancel}
          control={vehicule_form.control}
          isValid={vehicule_form.formState.isValid}
          setFile={setFile}
          form={form}
        />
      </Modal>
    </>
  );
}

export default AddVehiculeModal;
