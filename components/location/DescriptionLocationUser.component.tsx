import React from "react";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import ClientType from "@/types/Client.type";

type DescriptionLocationUser = {
  client: ClientType;
};

function DescriptionLocationUser({ client }: DescriptionLocationUser) {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Photo de profil",
      children: (
        <img
          src={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${client.utilisateur.photo_profil}`}
          alt="photo de profil"
          width={80}
          height={80}
          className="rounded-[50%]"
        />
      ),
    },
    {
      key: "2",
      label: "Email",
      children: client.utilisateur.email,
    },
    {
      key: "3",
      label: "Téléphone",
      children: client.utilisateur.telephone,
    },
    {
      key: "4",
      label: "Adresse",
      children: client.utilisateur.adresse,
    },
    {
      key: "5",
      label: "N° permis de conduire",
      children: client.permis_de_conduire,
    },
    {
      key: "6",
      label: "N° de CIN",
      children: client.num_cin,
    },
    {
      key: "7",
      label: "Date de naissance",
      children: new Date(client.date_de_naissance).toLocaleDateString(),
    },
  ];
  return (
    <Descriptions
      title="Information du client"
      layout="vertical"
      items={items}
    />
  );
}

export default DescriptionLocationUser;
