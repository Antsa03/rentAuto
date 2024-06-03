import getNumberOfDaysBetweenDates from "@/lib/getNumberOfDaysBetweenDates";
import prisma from "@/prisma/client";
import { Location } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "PUT")
      return res.status(401).json("Méthode non autorisé");
    const { id_location } = req.query;
    const locationProps: Location = req.body;
    const vehicule_louer = await prisma.vehicule.findUnique({
      where: { immatriculation: locationProps.immatriculation },
    });
    const nbr_jours = getNumberOfDaysBetweenDates(
      new Date(locationProps.date_debut),
      new Date(locationProps.date_fin)
    );
    if (id_location && vehicule_louer) {
      const old_location = await prisma.location.findUnique({
        where: { id_location: parseInt(id_location.toString()) },
      });
      const update_location = await prisma.location.update({
        where: { id_location: parseInt(id_location.toString()) },
        data: {
          ...locationProps,
          date_debut: new Date(locationProps.date_debut),
          date_fin: new Date(locationProps.date_fin),
          prix_total: nbr_jours * vehicule_louer.prix_par_jour,
        },
      });
      if (update_location) {
        await prisma.vehicule.update({
          where: { immatriculation: old_location?.immatriculation },
          data: {
            disponible: true,
          },
        });
        await prisma.vehicule.update({
          where: { immatriculation: update_location.immatriculation },
          data: {
            disponible: false,
          },
        });
      }
      return res.status(200).json(update_location);
    } else return res.status(404).json("ID location introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}
