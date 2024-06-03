"use client";
import { Icon } from "@iconify/react";
import React from "react";
import "@/app/globals.css";

type AddButtonProps = {
  title: string;
  setOpen: (arg: boolean) => void;
};

function AddButton({ title, setOpen }: AddButtonProps) {
  return (
    <button
      type="button"
      className="add-btn gap-1"
      onClick={() => setOpen(true)}
    >
      <span className="text-[28px]">
        <Icon icon="gg:add" />
      </span>
      <span>{title}</span>
    </button>
  );
}

export default AddButton;
