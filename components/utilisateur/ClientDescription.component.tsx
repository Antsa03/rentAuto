import React from "react";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import ClientType from "@/types/Client.type";

type ClientDescriptionProps = {
  client: ClientType;
};

function ClientDescription({ client }: ClientDescriptionProps) {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "N° permis de conduire",
      children: client.permis_de_conduire,
    },
    {
      key: "2",
      label: "N° de CIN",
      children: client.num_cin,
    },
    {
      key: "3",
      label: "Date de naissance",
      children: new Date(client.date_de_naissance).toLocaleDateString(),
    },
  ];
  return (
    <Descriptions
      title="Plus d'information"
      layout="horizontal"
      items={items}
    />
  );
}

export default ClientDescription;
