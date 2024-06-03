import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "DELETE")
      return res.status(401).json("Méthode non autorisé");
    const { id_utilisateur } = req.query;
    if (id_utilisateur) {
      const delete_utilisateur = await prisma.utilisateur.delete({
        where: { id_utilisateur: parseInt(id_utilisateur.toString()) },
      });
      return res.status(200).json(delete_utilisateur);
    } else {
      return res.status(401).json("Id utilisateur invalide ou introuvable");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
