import prisma from "@/prisma/client";
import { Client } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "PUT")
      return res.status(401).json("Méthode non autorisé");

    const { id_client } = req.query;
    const client_props: Client = req.body;
    if (id_client) {
      const update_client = await prisma.client.update({
        where: { id_client: parseInt(id_client.toString()) },
        data: {
          permis_de_conduire: client_props.permis_de_conduire,
          num_cin: client_props.num_cin,
          date_de_naissance: new Date(client_props.date_de_naissance),
        },
      });
      return res.status(200).json(update_client);
    } else
      return res
        .status(404)
        .json({ message: "ID client introuvable ou invalide" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
