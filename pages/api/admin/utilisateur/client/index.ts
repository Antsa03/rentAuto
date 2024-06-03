import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const clients = await prisma.client.findMany({
      include: {
        utilisateur: true,
      },
    });
    const clients_data = clients.map((client) => {
      return {
        ...client,
        date_de_naissance: client.date_de_naissance.toISOString().slice(0, 10),
      };
    });
    return res.status(200).json(clients_data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
