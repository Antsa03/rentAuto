import prisma from "@/prisma/client";
import { Client } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST")
      return res.status(401).json("Méthode non authorisé");
    const infoProps: Client = req.body;
    const create_client = await prisma.client.create({
      data: {
        ...infoProps,
        date_de_naissance: new Date(infoProps.date_de_naissance),
      },
    });
    return res.status(200).json(create_client);
  } catch (error) {
    return res.status(500).json(error);
  }
}
