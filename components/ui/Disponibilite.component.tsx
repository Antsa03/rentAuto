import React from "react";

export const Disponible: React.FC = () => {
  return (
    <div className="w-[12px] h-[12px] rounded-full bg-green-500 ml-auto"></div>
  );
};

export const Indisponible: React.FC = () => {
  return (
    <div className="w-[12px] h-[12px] rounded-full bg-red-500 ml-auto"></div>
  );
};
