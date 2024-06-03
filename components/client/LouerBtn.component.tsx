"use client";
import { Icon } from "@iconify/react";
import React from "react";

type LouerBtnProps = {
  title: string;
  setOpen: (arg: boolean) => void;
  disponible: boolean;
};

function LouerBtn({ title, disponible, setOpen }: LouerBtnProps) {
  return (
    <button
      type="button"
      className={`add-btn gap-1 ${
        disponible ? "" : "cursor-not-allowed opacity-50"
      }`}
      onClick={() => setOpen(true)}
      disabled={!disponible}
    >
      <span className="text-[28px]">
        <Icon icon="typcn:shopping-cart" />
      </span>
      <span className="text-lg font-semibold">{title}</span>
    </button>
  );
}

export default LouerBtn;
