"use client";
import ClientVehiculeCard from "@/components/client/ClientVehiculeCard.component";
import PaginationLink from "@/components/ui/PaginationLink.component";
import { useClient } from "@/hooks/useFechData.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Vehicule } from "@prisma/client";
import { Select } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

function ClientVehiculePage() {
  const { data: session }: any = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.userRole === "Administrateur") router.push("/admin/dashboard");
  }, [session]);

  const vehicule_data = useClient<Vehicule[]>("/api/vehicule");
  const {
    data: vehicules,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vehicules"],
    queryFn: vehicule_data.fetchData,
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
      <h1 className="text-3xl text-customBlue font-extrabold my-4 gap-1">
        Choisissez la voiture qui vous convient
      </h1>

      <div className="flex items-center justify-start space-x-4 mt-5">
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
              <ClientVehiculeCard key={index} vehicule={vehicule} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClientVehiculePage;
