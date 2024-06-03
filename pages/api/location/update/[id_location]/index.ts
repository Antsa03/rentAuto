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
    const new_vehicule = await prisma.vehicule.findUnique({
      where: { immatriculation: locationProps.immatriculation },
    });
    if (id_location && new_vehicule) {
      const old_location = await prisma.location.findUnique({
        where: { id_location: parseInt(id_location.toString()) },
      });
      const nbr_jours = getNumberOfDaysBetweenDates(
        new Date(locationProps.date_debut),
        new Date(locationProps.date_fin)
      );
      const updateLocation = await prisma.location.update({
        where: { id_location: parseInt(id_location.toString()) },
        data: {
          id_client: locationProps.id_client,
          immatriculation: locationProps.immatriculation,
          date_debut: new Date(locationProps.date_debut),
          date_fin: new Date(locationProps.date_fin),
          prix_total: nbr_jours * new_vehicule.prix_par_jour,
        },
      });
      if (updateLocation) {
        await prisma.vehicule.update({
          where: { immatriculation: old_location?.immatriculation },
          data: {
            disponible: true,
          },
        });
        await prisma.vehicule.update({
          where: { immatriculation: updateLocation.immatriculation },
          data: {
            disponible: false,
          },
        });
      }
      return res.status(200).json(updateLocation);
    } else return res.status(404).json("ID location introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}
