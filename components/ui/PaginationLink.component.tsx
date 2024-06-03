"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

type PaginationLinkProps = {
  path: string;
  label: string;
  labelPath: string;
  setLabelPath: Function;
};

function PaginationLink({
  path,
  label,
  labelPath,
  setLabelPath,
}: PaginationLinkProps) {
  const isActive = label === labelPath;
  return (
    <Link
      href={path}
      aria-current="page"
      className={`${
        isActive
          ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      }`}
      onClick={() => setLabelPath(label)}
    >
      {label}
    </Link>
  );
}

export default PaginationLink;
