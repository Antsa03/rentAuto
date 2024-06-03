import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

type UtilisateurProps = {
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { email } = req.query;
    const utilisateurProps: UtilisateurProps = req.body;
    const hashedPassword = await bcrypt.hash(utilisateurProps.password, 10);
    const updateUtilisateur = await prisma.utilisateur.update({
      where: {
        email: email?.toString(),
      },
      data: {
        password: hashedPassword,
      },
    });
    return res.status(200).json(updateUtilisateur);
  } catch (error) {
    console.error(error);
  }
}
