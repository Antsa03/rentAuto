import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { Location, Vehicule } from "@prisma/client";
import { showSwal } from "@/lib/showSwal";
import { useClient } from "@/hooks/useFechData.hook";
import { useQuery, useQueryClient } from "react-query";
import ClientType from "@/types/Client.type";
import LocationForm from "../location/LocationForm.component";
import LocationType from "@/types/LocationType.type";
import { useUpdate } from "@/hooks/useUpdate.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import ModalTitle from "../ui/ModalTitle.component";

type UpdateLocationModalProps = {
  location: LocationType;
};

function UpdateLocationModal({ location }: UpdateLocationModalProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const location_form = useForm<Location>({
    defaultValues: location,
  });

  //Récupérer les véhicules
  const vehicule_data = useClient<Vehicule[]>("/api/admin/vehicule");
  const vehicules = useQuery({
    queryKey: ["vehicules"],
    queryFn: vehicule_data.fetchData,
  });

  //Récupérer les clients
  const client_data = useClient<ClientType[]>("/api/utilisateur/client");
  const clients = useQuery({
    queryKey: ["clients"],
    queryFn: client_data.fetchData,
  });

  const update_location = useUpdate<Location>(
    `/api/location/update/${location.id_location}`,
    () => {
      showSwal(
        "Information",
        "La location a été modifiée avec succès",
        "success"
      );
      queryClient.invalidateQueries("locations");
      location_form.reset();
      setOpen(false);
    }
  );

  const handleSubmitLocation: SubmitHandler<Location> = async (location) => {
    try {
      await update_location.handleUpdate(location);
    } catch (error) {
      showSwal("Information", "Une erreur a survenu", "error");
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
      <button
        className="w-[50px] text-3xl text-white rounded-lg bg-yellow-500 hover:bg-yellow-700 mr-1 p-2"
        onClick={() => setOpen(true)}
      >
        <Icon icon="ion:create" />
      </button>
      <Modal
        title={<ModalTitle title="Modifier location" />}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => oncancel()}
        width={800}
        className="my-[1%]"
        footer={null}
      >
        <LocationForm
          control={location_form.control}
          isValid={location_form.formState.isValid}
          vehicules={vehicules.data}
          clients={clients.data}
          onFinish={onFinish}
          onCancel={oncancel}
        />
      </Modal>
    </>
  );
}

export default UpdateLocationModal;
