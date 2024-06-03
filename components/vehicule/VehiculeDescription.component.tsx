import { Vehicule } from "@prisma/client";
import { Space } from "antd";
import React from "react";

type VehiculeDescriptionComponent = {
  vehicule: Vehicule;
};

function VehiculeDescriptionComponent({
  vehicule,
}: VehiculeDescriptionComponent) {
  return (
    <div className="w-full h-full">
      <h3 className="text-xl font-bold text-customGreen">
        Information du véhicule
      </h3>
      <Space size="large" className="mt-2">
        <div className="w-[200px]">
          <p className="mb-2">
            <span className="text-gray-500 font-semibold">
              Immatriculation:{" "}
            </span>
            {vehicule.immatriculation}
          </p>
          <p>
            <span className="text-gray-500 font-semibold">Modèle: </span>
            {vehicule.modele}
          </p>
        </div>
        <div className="w-[200px]">
          <p className="mb-2">
            <span className="text-gray-500 font-semibold">Marque: </span>
            {vehicule.marque}
          </p>
          <p>
            <span className="text-gray-500 font-semibold">Année: </span>
            {vehicule.annee}
          </p>
        </div>
      </Space>
      <Space size="large" className="mt-2">
        <div className="w-[200px]">
          <p className="mb-2">
            <span className="text-gray-500 font-semibold">Kilometrage: </span>
            {vehicule.kilometrage + " Km"}
          </p>
          <p>
            <span className="text-gray-500 font-semibold">
              Prix par jours:{" "}
            </span>
            {vehicule.prix_par_jour.toLocaleString() + " Ar"}
          </p>
        </div>
        <div className="w-[200px]">
          <p className="mb-2">
            <span className="text-gray-500 font-semibold">
              Type de carburant:{" "}
            </span>
            {vehicule.carburant}
          </p>
          <p>
            <span className="text-gray-500 font-semibold">
              Nombre de place:{" "}
            </span>
            {vehicule.nbr_place}
          </p>
        </div>
      </Space>
    </div>
  );
}

export default VehiculeDescriptionComponent;
