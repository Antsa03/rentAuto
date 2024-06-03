"use client";
import AddVehiculeModal from "@/components/modal/AddVehiculeModal.component";
import PaginationLink from "@/components/ui/PaginationLink.component";
import VehiculeCard from "@/components/vehicule/VehiculeCard.component";
import { useDelete } from "@/hooks/useDelete.hook";
import { useClient } from "@/hooks/useFechData.hook";
import { useSetDispo } from "@/hooks/useSetDispo.hook";
import { showSwal } from "@/lib/showSwal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Vehicule } from "@prisma/client";
import { Select } from "antd";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

function AdminVehiculePage() {
  const vehicule_data = useClient<Vehicule[]>("/api/admin/vehicule");
  const {
    data: vehicules,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vehicules"],
    queryFn: vehicule_data.fetchData,
  });

  const queryClient = useQueryClient();
  const { handleDelete } = useDelete("/api/utilisateur/delete", () => {
    queryClient.invalidateQueries("vehicules");
  });

  const { handleSetDispo } = useSetDispo("/api/vehicule", () => {
    queryClient.invalidateQueries("vehicules");
    showSwal("Information", "Le véhicule est de nouveau disponible", "success");
  });

  //Logique de filtrage
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);

  const filteredVehicles = vehicules?.filter(
    (vehicule) =>
      (!filterCategory || vehicule.categorie === filterCategory) &&
      (!filterAvailable || vehicule.disponible)
  );

  const groupByCategory = () => {
    const categories: Record<string, Vehicule[]> = {};
    filteredVehicles?.forEach((vehicule) => {
      if (!categories[vehicule.categorie]) {
        categories[vehicule.categorie] = [];
      }
      categories[vehicule.categorie].push(vehicule);
    });

    return categories;
  };

  const vehiculeByCategory = groupByCategory();

  return (
    <div className="p-4">
      <h1 className="text-3xl text-customBlue font-extrabold my-4 flex items-center gap-1">
        <Icon icon="fa-solid:car"></Icon>
        <span>Listage des véhicules</span>
      </h1>
      <AddVehiculeModal />

      <div className="flex items-center justify-start space-x-4 my-5">
        <div className="flex items-center">
          <Icon icon="flowbite:filter-outline" className="text-3xl font-bold" />
          <span className="font-semibold">Filtre :</span>
        </div>
        <label htmlFor="categoryFilter">Catégorie:</label>
        <Select
          options={[
            { value: "", label: <span>Toutes</span> },
            { value: "Berline", label: <span>Berline</span> },
            { value: "Citadine", label: <span>Citadine</span> },
            { value: "Compacte", label: <span>Compacte</span> },
            { value: "Monospace", label: <span>Monospace</span> },
            { value: "SUV", label: <span>SUV</span> },
          ]}
          onChange={(e) => setFilterCategory(e)}
          defaultValue={"Toutes"}
          className="w-[150px]"
        />
        <label htmlFor="availableFilter">Disponible:</label>
        <input
          type="checkbox"
          id="availableFilter"
          checked={filterAvailable}
          onChange={(e) => setFilterAvailable(e.target.checked)}
        />
      </div>

      {Object.entries(vehiculeByCategory).map(([categorie, vehicles]) => (
        <div
          key={categorie}
          id={categorie}
          className="h-fit border shadow-xl rounded-lg py-3 mt-10 mb-3"
        >
          <h2 className="text-2xl font-bold text-center my-4">
            {categorie + " (" + vehicles.length + ")"}
          </h2>
          <div className="flex flex-row gap-16 flex-wrap justify-center">
            {vehicles.map((vehicule, index) => (
              <VehiculeCard
                key={index}
                vehicule={vehicule}
                handleDelete={handleDelete}
                handleSetDispo={handleSetDispo}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminVehiculePage;
