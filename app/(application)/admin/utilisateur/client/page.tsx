"use client";
import { useClient } from "@/hooks/useFechData.hook";
import ClientType from "@/types/Client.type";
import React, { ChangeEvent, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Input, Table, Dropdown, Space } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import AddClientModal from "@/components/modal/AddClientModal.component";
import UpdateClientModal from "@/components/modal/UpdateClientModal.component";
import { useDelete } from "@/hooks/useDelete.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import ClientDescription from "@/components/utilisateur/ClientDescription.component";

function ClientListPage() {
  const client_data = useClient<ClientType[]>("/api/admin/utilisateur/client");
  const {
    data: clients,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: client_data.fetchData,
  });

  const [search, setSearch] = useState({
    nom: "",
    telephone: "",
    email: "",
  });

  const handleInputchange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  //Logique de suppression
  const { handleDelete } = useDelete("/api/admin/utilisateur/delete", () => {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries("clients");
  });

  const columns: TableColumnsType<ClientType> = [
    {
      title: "#",
      dataIndex: ["utilisateur", "id_utilisateur"],
      key: "utilisateur.id_utilisateur",
    },
    {
      title: "Photo",
      dataIndex: ["utilisateur", "photo_profil"],
      key: "utilisateur.photo_profil",
      render: (text) => (
        <img
          src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${text}`}
          alt="photo de profil"
          className="w-[80px] h-[80px] rounded-full"
        />
      ),
    },
    {
      title: "Nom",
      dataIndex: ["utilisateur", "nom"],
      key: "utilisateur.nom",
      filteredValue: [search.nom],
      onFilter: (value, record) => {
        return String(record.utilisateur.nom)
          .toLowerCase()
          .includes(value.toString().toLocaleLowerCase());
      },
    },
    {
      title: "Prénom(s)",
      dataIndex: ["utilisateur", "prenom"],
      key: "utilisateur.prenom",
    },
    {
      title: "Genre",
      dataIndex: ["utilisateur", "genre"],
      key: "utilisateur.genre",
      render: (text) => {
        return text === "M" ? "Masculin" : "Féminin";
      },
    },
    {
      title: "Téléphone",
      dataIndex: ["utilisateur", "telephone"],
      key: "utilisateur.telephone",
      filteredValue: [search.telephone],
      onFilter: (value, record) => {
        return String(record.utilisateur.telephone)
          .toLowerCase()
          .includes(value.toString().toLocaleLowerCase());
      },
    },
    {
      title: "Adresse",
      dataIndex: ["utilisateur", "adresse"],
      key: "utilisateur.adresse",
    },
    {
      title: "Email",
      dataIndex: ["utilisateur", "email"],
      key: "utilisateur.email",
      filteredValue: [search.email],
      onFilter: (value, record) => {
        return String(record.utilisateur.email)
          .toLowerCase()
          .includes(value.toString().toLocaleLowerCase());
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: ClientType) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: <UpdateClientModal client={record} />,
          },
          {
            key: "2",
            label: (
              <button
                className="w-[50px] p-2 rounded-lg bg-red-400 hover:bg-red-700 text-xl text-white"
                onClick={() => handleDelete(record.id_utilisateur)}
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
              className="text-[36px] w-fit h-fit p-0 m-0 text-customBlue hover:text-blue-700"
              onClick={(e) => e.preventDefault()}
            >
              <Icon icon="ion:ellipsis-vertical-circle" />
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const renderExpandableRow = (record: ClientType) => (
    <ClientDescription client={record} />
  );

  if (isError) return <h1>Il y a une erreur ...</h1>;
  if (isLoading) return <h1>Chargement ...</h1>;

  const data = clients?.map((client, key) => {
    return {
      key: key,
      ...client,
    };
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl text-customBlue font-extrabold my-4">
        <Space size="small">
          <Icon icon="ion:person" />
          <span>Listage des clients</span>
        </Space>
      </h1>
      <AddClientModal />
      <div className="w-fit my-8">
        <Space size="large">
          <Input.Search
            name="nom"
            onChange={handleInputchange}
            placeholder="Recherche par nom ..."
            style={{ width: 300 }}
          />
          <Input.Search
            name="telephone"
            onChange={handleInputchange}
            placeholder="Recherche par téléphone ..."
            style={{ width: 300 }}
          />
          <Input.Search
            name="email"
            onChange={handleInputchange}
            placeholder="Recherche par email ..."
            style={{ width: 300 }}
          />
        </Space>
      </div>
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

export default ClientListPage;
