import React from "react";
import { Card } from "antd";
import { Vehicule } from "@prisma/client";
import { Disponible, Indisponible } from "../ui/Disponibilite.component";
import VehiculeDescriptionComponent from "../vehicule/VehiculeDescription.component";
import AjoutPanier from "./AjoutPanier.component";

type ClientVehiculeCardProps = {
  vehicule: Vehicule;
};

function ClientVehiculeCard({ vehicule }: ClientVehiculeCardProps) {
  return (
    <Card
      title={vehicule.disponible ? <Disponible /> : <Indisponible />}
      style={{ width: 430, height: "fit-content", padding: 0 }}
      className="shadow-md overflow-hidden"
      cover={
        <div className="w-full h-[260px]">
          <img
            alt="image-vehicule"
            src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${vehicule.image_vehicule}`}
            className="w-full h-full"
          />
        </div>
      }
    >
      <VehiculeDescriptionComponent vehicule={vehicule} />
      <div className="w-fit mx-auto mt-3">
        <AjoutPanier disponible={vehicule.disponible} vehicule={vehicule} />
      </div>
    </Card>
  );
}

export default ClientVehiculeCard;
