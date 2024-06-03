import React from "react";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Vehicule } from "@prisma/client";
import UpdateVehiculeModal from "../modal/UpdateVehiculeModal.component";
import VehiculeDescriptionComponent from "./VehiculeDescription.component";
import { Disponible, Indisponible } from "../ui/Disponibilite.component";

type VehiculeCardProps = {
  vehicule: Vehicule;
  handleDelete: (id: string | number) => void;
  handleSetDispo: (id: string | number) => void;
};

function VehiculeCard({
  vehicule,
  handleDelete,
  handleSetDispo,
}: VehiculeCardProps) {
  return (
    <Card
      title={vehicule.disponible ? <Disponible /> : <Indisponible />}
      style={{ width: 430 }}
      className="shadow-md"
      cover={
        <div className="w-full h-[260px]">
          <img
            alt="image-vehicule"
            src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${vehicule.image_vehicule}`}
            className="w-full h-full"
          />
        </div>
      }
      actions={[
        <UpdateVehiculeModal key="edit" vehicule={vehicule} />,
        <DeleteOutlined
          key="delete"
          onClick={() => handleDelete(vehicule.immatriculation)}
        />,
        <CheckOutlined
          key="dispo"
          onClick={() => handleSetDispo(vehicule.immatriculation)}
        />,
      ]}
    >
      <VehiculeDescriptionComponent vehicule={vehicule} />
    </Card>
  );
}

export default VehiculeCard;
