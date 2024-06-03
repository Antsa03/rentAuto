"use client";
import { Icon } from "@iconify/react";

export const FooterApp = () => {
  return (
    <>
      <div className="flex justify-between ">
        <div>
          <h3> Nos Agences Disponible dans toute l'Iles : </h3>
          <ul className="">
            <li> - Antsiranana</li>
            <li> - Toamasina</li>
            <li> - Fianarantsoa</li>
            <li> - Antsirabe</li>
            <li> - Majunga</li>
            <li> - Tuléar</li>
          </ul>
        </div>

        <div className="flex flex-col justify-between">
          <h3 className="font-semibold">RentAuto</h3>
          <p>+261 34 59 029 39</p>
          <p>RentAuto@gmail.com</p>
          <div>
            <h3 className="font-semibold">Localisation</h3>
            <p>
              Route d'hydrocarbure Ankorondrano , Antananarivo 101 Madagascar
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <p>&copy; 2024 Entreprise RentCar</p>
        <div className="flex text-white gap-x-3 text-xl">
          <Icon icon="ic:outline-facebook" />
          <Icon icon="mingcute:twitter-line" />
          <Icon icon="ri:instagram-line" />
        </div>
      </div>
    </>
  );
};
