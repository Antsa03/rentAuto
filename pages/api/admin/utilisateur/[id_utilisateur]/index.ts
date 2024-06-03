import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id_utilisateur } = req.query;
    if (id_utilisateur) {
      const utilisateur = await prisma.utilisateur.findUnique({
        where: { id_utilisateur: parseInt(id_utilisateur.toString()) },
      });
      return res.status(200).json(utilisateur);
    } else
      return res.status(404).json("ID utilisateur introuvable ou non défini");
  } catch (error) {
    return res.status(500).json(error);
  }
}
