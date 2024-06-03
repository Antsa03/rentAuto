"use client";
import { useClient } from "@/hooks/useFechData.hook";
import React, { ChangeEvent, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Input, Table, Dropdown, Space } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { useDelete } from "@/hooks/useDelete.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Utilisateur } from "@prisma/client";
import AddAdminModal from "@/components/modal/AddAdminModal.component";
import UpdateAdminModal from "@/components/modal/UpdateAdminModal.component";

function AdministrateurPage() {
  const utilisateur_data = useClient<Utilisateur[]>("/api/admin/utilisateur");
  const {
    data: utilisateurs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["utilisateurs"],
    queryFn: utilisateur_data.fetchData,
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
    queryClient.invalidateQueries("utilisateurs");
  });

  const columns: TableColumnsType<Utilisateur> = [
    {
      title: "#",
      dataIndex: ["id_utilisateur"],
      key: "utilisateur.id_utilisateur",
    },
    {
      title: "Nom",
      dataIndex: ["nom"],
      key: "utilisateur.nom",
      filteredValue: [search.nom],
      onFilter: (value, record) => {
        return String(record.nom)
          .toLowerCase()
          .includes(value.toString().toLocaleLowerCase());
      },
    },
    {
      title: "Prénom(s)",
      dataIndex: ["prenom"],
      key: "utilisateur.prenom",
    },
    {
      title: "Genre",
      dataIndex: ["genre"],
      key: "utilisateur.genre",
      render: (text) => {
        return text === "M" ? "Masculin" : "Féminin";
      },
    },
    {
      title: "Téléphone",
      dataIndex: ["telephone"],
      key: "utilisateur.telephone",
      filteredValue: [search.telephone],
      onFilter: (value, record) => {
        return String(record.telephone)
          .toLowerCase()
          .includes(value.toString().toLocaleLowerCase());
      },
    },
    {
      title: "Adresse",
      dataIndex: ["adresse"],
      key: "utilisateur.adresse",
    },
    {
      title: "Email",
      dataIndex: ["email"],
      key: "utilisateur.email",
      filteredValue: [search.email],
      onFilter: (value, record) => {
        return String(record.email)
          .toLowerCase()
          .includes(value.toString().toLocaleLowerCase());
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (record: Utilisateur) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: <UpdateAdminModal utilisateur={record} />,
          },
          {
            key: "2",
            label: (
              <button
                className="w-[50px] p-2 rounded-lg bg-red-400 hover:bg-red-700 text-xl text-white text-center"
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

  if (isError) return <h1>Il y a une erreur ...</h1>;
  if (isLoading) return <h1>Chargement ...</h1>;

  const data = utilisateurs
    ?.filter((utilisateur) => utilisateur.isAdmin)
    .map((utilisateur, key) => {
      return {
        key: key,
        ...utilisateur,
      };
    });

  return (
    <div className="p-4">
      <h1 className="text-3xl text-customBlue font-extrabold my-4">
        <Space size="small">
          <Icon icon="ri:admin-fill" />
          <span>Listage des administrateurs</span>
        </Space>
      </h1>
      <AddAdminModal />
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AdministrateurPage;
