import React from "react";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import ClientType from "@/types/Client.type";
import { Vehicule } from "@prisma/client";

type DescriptionLocationVehicule = {
  vehicule: Vehicule;
};

function DescriptionLocationVehicule({
  vehicule,
}: DescriptionLocationVehicule) {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Image du véhicule",
      children: (
        <img
          src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${vehicule.image_vehicule}`}
          alt="Image du véhicule"
          width={120}
          height={120}
        />
      ),
    },
    {
      key: "2",
      label: "Immatriculation",
      children: vehicule.immatriculation,
    },
    {
      key: "3",
      label: "Marque",
      children: vehicule.marque,
    },
    {
      key: "4",
      label: "Modèle",
      children: vehicule.modele,
    },
    {
      key: "5",
      label: "Année",
      children: vehicule.annee,
    },
    {
      key: "6",
      label: "Kilometrage",
      children: vehicule.kilometrage.toLocaleString() + " Km",
    },
    {
      key: "7",
      label: "Type de carburant",
      children: vehicule.carburant,
    },
    {
      key: "8",
      label: "Catégorie",
      children: vehicule.categorie,
    },
  ];
  return (
    <Descriptions
      title="Information du véhicule"
      layout="vertical"
      items={items}
    />
  );
}

export default DescriptionLocationVehicule;
