import prisma from "@/prisma/client";
import { Utilisateur } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST")
      return res.status(401).json("Méthode non authorisé");
    const utilisateur: Utilisateur = req.body;
    const create_utilisateur: Utilisateur = await prisma.utilisateur.create({
      data: utilisateur,
    });
    return res.status(200).json(create_utilisateur);
  } catch (error) {
    return res.status(401).json(error);
  }
}
