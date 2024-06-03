import React, { useState } from "react";
import { Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { Location, Vehicule } from "@prisma/client";
import { showSwal } from "@/lib/showSwal";
import { useCreate } from "@/hooks/useCreate.hook";
import AddButton from "../ui/AddButton.component";
import { useClient } from "@/hooks/useFechData.hook";
import { useQuery, useQueryClient } from "react-query";
import ClientType from "@/types/Client.type";
import LocationForm from "../location/LocationForm.component";
import ModalTitle from "../ui/ModalTitle.component";

function AddLocationModal() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const location_form = useForm<Location>({
    mode: "all",
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

  const create_location = useCreate<Location>(
    "/api/admin/location/create",
    () => {
      showSwal("Information", "La location a été créée avec succès", "success");
      queryClient.invalidateQueries("locations");
      location_form.reset();
      setOpen(false);
    }
  );

  const handleSubmitLocation: SubmitHandler<Location> = async (location) => {
    try {
      await create_location.handleAdd(location);
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
      <AddButton title="Ajout de location" setOpen={setOpen} />
      <Modal
        title={<ModalTitle title="Ajout de location" />}
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

export default AddLocationModal;
