"use client";
import { useClient } from "@/hooks/useFechData.hook";
import ClientLocation from "@/types/ClientLocation.type";
import { Table, TableColumnsType } from "antd";
import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";

function PanierClientPage() {
  const { data: session }: any = useSession();

  const location_data = useClient<ClientLocation[]>(
    `/api/location/${session?.id_client}`
  );
  const { data: client_location } = useQuery({
    queryKey: ["client_location"],
    queryFn: location_data.fetchData,
  });

  const data = client_location?.map((location, index) => {
    return {
      key: index,
      ...location,
    };
  });

  const columns: TableColumnsType<ClientLocation> = [
    {
      title: "Immatriculation",
      dataIndex: ["vehicule", "immatriculation"],
      key: "vehicule.immatriculation",
    },
    {
      title: "Image du véhicule",
      dataIndex: ["vehicule", "image_vehicule"],
      key: "vehicule.image_vehicule",
      render: (text) => (
        <img
          src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${text}`}
          alt="Vehicule"
          className="w-[130px] h-[90px]"
        />
      ),
    },
    {
      title: "Date de début",
      dataIndex: ["date_debut"],
      key: "date_debut",
      render: (text: string) => {
        return new Date(text.slice(0, 10)).toLocaleDateString();
      },
    },
    {
      title: "Date de fin",
      dataIndex: ["date_fin"],
      key: "date_fin",
      render: (text: string) => {
        return new Date(text.slice(0, 10)).toLocaleDateString();
      },
    },
    {
      title: "Prix total",
      dataIndex: ["prix_total"],
      key: "prix_total",
      render: (text: string) => {
        return Number(text).toLocaleString() + " Ar";
      },
    },
  ];
  return (
    <div className="p-4">
      <h1 className="text-3xl text-customBlue text-center my-4 font-extrabold">
        Historique de vos locations
      </h1>
      <Table className="mt-10" columns={columns} dataSource={data} />
    </div>
  );
}

export default PanierClientPage;
