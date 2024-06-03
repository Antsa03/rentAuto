import prisma from "@/prisma/client";
import { Utilisateur } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "PUT")
      return res.status(401).json("Méthode non authorisé");
    const { id_utilisateur } = req.query;
    const utilisateur: Utilisateur = req.body;
    if (id_utilisateur) {
      const update_utilisateur: Utilisateur = await prisma.utilisateur.update({
        where: { id_utilisateur: parseInt(id_utilisateur as string) },
        data: {
          photo_profil: utilisateur.photo_profil,
          nom: utilisateur.nom,
          prenom: utilisateur.prenom,
          genre: utilisateur.genre,
          adresse: utilisateur.adresse,
          telephone: utilisateur.telephone,
          email: utilisateur.email,
          isAdmin: utilisateur.isAdmin,
        },
      });
      return res.status(200).json(update_utilisateur);
    } else return res.status(401).json("ID est invalide ou introuvable");
  } catch (error) {
    return res.status(401).json(error);
  }
}
