import getNumberOfDaysBetweenDates from "@/lib/getNumberOfDaysBetweenDates";
import prisma from "@/prisma/client";
import { Location } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST")
      return res.status(401).json("Méthode non autorisé");
    const locationProps: Location = req.body;
    const vehicule_louer = await prisma.vehicule.findUnique({
      where: { immatriculation: locationProps.immatriculation },
    });

    const nbr_jours = getNumberOfDaysBetweenDates(
      new Date(locationProps.date_debut),
      new Date(locationProps.date_fin)
    );

    if (vehicule_louer) {
      const create_location = await prisma.location.create({
        data: {
          ...locationProps,
          date_debut: new Date(locationProps.date_debut),
          date_fin: new Date(locationProps.date_fin),
          prix_total: nbr_jours * vehicule_louer.prix_par_jour,
        },
      });
      if (create_location) {
        await prisma.vehicule.update({
          where: { immatriculation: create_location.immatriculation },
          data: {
            disponible: false,
          },
        });
      }
      return res.status(200).json(create_location);
    } else return res.status(404).json({ message: "Véhicule introuvable" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
