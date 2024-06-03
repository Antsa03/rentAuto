import { Location, Vehicule } from "@prisma/client";
import ClientType from "./Client.type";

export default interface LocationType extends Location {
  client: ClientType;
  vehicule: Vehicule;
}
