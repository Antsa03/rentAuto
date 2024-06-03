import React from "react";

function ModalTitle({ title }: { title: string }) {
  return (
    <h1 className="text-2xl text-center text-customBlue font-bold">{title}</h1>
  );
}

export default ModalTitle;
