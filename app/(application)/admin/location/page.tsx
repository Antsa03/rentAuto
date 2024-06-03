"use client";
import DescriptionLocationUser from "@/components/location/DescriptionLocationUser.component";
import DescriptionLocationVehicule from "@/components/location/DescriptionLocationVehicule.component";
import AddLocationModal from "@/components/modal/AddLocationModal.component";
import UpdateLocationModal from "@/components/modal/UpdateLocationModal.component";
import { useDelete } from "@/hooks/useDelete.hook";
import { useClient } from "@/hooks/useFechData.hook";
import LocationType from "@/types/LocationType.type";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown, MenuProps, Space, Table, TableColumnsType } from "antd";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

function AdminLocationPage() {
  const location_data = useClient<LocationType[]>("/api/admin/location");
  const {
    data: locations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: location_data.fetchData,
  });

  const { handleDelete } = useDelete("/api/location/delete", () => {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries("locations");
  });

  const columns: TableColumnsType<LocationType> = [
    {
      title: "ID Location",
      dataIndex: ["id_location"],
      key: "id_utilisateur",
    },
    {
      title: "Nom du client",
      dataIndex: ["client", "utilisateur", "nom"],
      key: "client.utilisateur.nom",
    },
    {
      title: "Prénom(s) du client",
      dataIndex: ["client", "utilisateur", "prenom"],
      key: "client.utilisateur.prenom",
    },
    {
      title: "Genre du client",
      dataIndex: ["client", "utilisateur", "genre"],
      key: "client.utilisateur.genre",
      render: (text: string) => {
        return text === "M" ? "Masculin" : "Féminin";
      },
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
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: LocationType) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: <UpdateLocationModal location={record} />,
          },
          {
            key: "2",
            label: (
              <button
                className="w-[50px] p-2 rounded-lg bg-red-400 hover:bg-red-700 text-xl text-white"
                onClick={() => handleDelete(record.id_location)}
              >
                <Icon icon="gg:trash" className="text-3xl" />
              </button>
            ),
          },
        ];
        return (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="w-fit h-fit p-0 m-0"
          >
            <a
              className="text-[36px] w-fit h-fit p-0 m-0 text-customBlue hover:text-blue-800"
              onClick={(e) => e.preventDefault()}
            >
              <Icon icon="ion:ellipsis-vertical-circle" />
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const renderExpandableRow = (record: LocationType) => (
    <>
      <DescriptionLocationUser client={record.client} />
      <DescriptionLocationVehicule vehicule={record.vehicule} />
    </>
  );

  const data = locations?.map((location, key) => {
    return {
      key: key,
      ...location,
    };
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl text-customBlue font-extrabold my-4">
        <Space size="small">
          <Icon icon="carbon:global-loan-and-trial" />
          <span>Listage des locations de voiture</span>
        </Space>
      </h1>
      <AddLocationModal />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: renderExpandableRow,
        }}
        dataSource={data}
      />
    </div>
  );
}

export default AdminLocationPage;
