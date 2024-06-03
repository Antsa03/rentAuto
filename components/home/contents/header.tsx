import React from "react";
import { offroader } from "../../../assets";
import Image from "next/image";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <div className="h-screen laptop:grid grid-cols-2 px-10 laptop:-mt-20">
      <Image
        src={offroader}
        alt="off-road"
        className="object-cover ml-[50%] laptop:mt-[50%] laptop:-translate-y-1/2 -translate-x-1/2"
      />
      <div className="flex justify-center items-center my-10  laptop:my-0 laptop:h-full">
        <div className="bg-customGray py-8 px-5 mb-20 laptop:mb-0 rounded-lg ">
          <h1 className="text-3xl tablet:text-5xl mb-3 text-customGreen font-semibold">
            Location de voiture chez RentAuto
          </h1>
          <p>
            Faites de votre voyage une expérience agréable en choisissant la
            catégorie de véhicule qui saura répondre à votre besoin du moment .
          </p>

          <Link href={"/vehicule"}>
            <button
              type="button"
              className="mt-10 text-white bg-customGreen hover:bg-green-700 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              Louer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
