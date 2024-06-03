import React, { useState } from "react";
import { Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { Location, Vehicule } from "@prisma/client";
import { showSwal } from "@/lib/showSwal";
import { useCreate } from "@/hooks/useCreate.hook";
import { useQueryClient } from "react-query";
import ModalTitle from "../ui/ModalTitle.component";
import LouerBtn from "./LouerBtn.component";
import ClientLocationForm from "./ClientLocationForm.component";
import { useSession } from "next-auth/react";
import NoSessionLouerBtn from "./NoSessionLouerBtn.component";

type AjoutPanierProps = {
  vehicule: Vehicule;
  disponible: boolean;
};

function AjoutPanier({ vehicule, disponible }: AjoutPanierProps) {
  //Récupérer la session
  const { data: session }: any = useSession();
  const [open, setOpen] = useState(false);

  //Logique du modal login
  const [showLoginModal, setShowLoginModal] = useState(false);

  const queryClient = useQueryClient();

  const location_form = useForm<Location>({
    mode: "all",
  });

  const create_location = useCreate<Location>("/api/location/create", () => {
    showSwal("Information", "La location a été créée avec succès", "success");
    queryClient.invalidateQueries("locations");
    queryClient.invalidateQueries("vehicules");
    location_form.reset();
    setOpen(false);
  });

  const handleSubmitLocation: SubmitHandler<Location> = async (location) => {
    try {
      location.id_client = session.id_client;
      location.immatriculation = vehicule.immatriculation;
      create_location.handleAdd(location);
    } catch (error) {
      console.error(error);
    }
  };

  //Finaliser les requêtes
  const onFinish = async () => {
    await location_form.handleSubmit(handleSubmitLocation)();
  };

  const oncancel = () => {
    location_form.reset();
    setOpen(false);
  };

  return (
    <>
      {session ? (
        <LouerBtn disponible={disponible} title="Louer" setOpen={setOpen} />
      ) : (
        <NoSessionLouerBtn disponible={disponible} />
      )}
      <Modal
        title={<ModalTitle title="Ajouter panier" />}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => oncancel()}
        width={800}
        className="my-[1%]"
        footer={null}
      >
        <div className="w-full flex flex-row items-center gap-3">
          <div className="w-[450px] h-[200px]">
            <img
              alt="image-vehicule"
              src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${vehicule.image_vehicule}`}
              className="w-full h-full"
            />
          </div>
          <div className="w-full">
            <ClientLocationForm
              prix_par_jour={vehicule.prix_par_jour}
              control={location_form.control}
              isValid={location_form.formState.isValid}
              onFinish={onFinish}
              onCancel={oncancel}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AjoutPanier;
