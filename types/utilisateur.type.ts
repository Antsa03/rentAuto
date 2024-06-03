import { Utilisateur } from "@prisma/client";

export default interface UtilisateurType extends Utilisateur {
  confirm_password: string;
}
