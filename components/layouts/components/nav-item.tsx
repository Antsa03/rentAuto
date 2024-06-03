"use client";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";

type NavProps = {
  text: string;
  icon: string;
  to: string;
};

export const Nav = (props: NavProps) => {
  const { icon, text, to } = props;
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className={`flex gap-x-1 items-center ${isActive ? "font-bold" : ""}`}
    >
      <span>{text}</span>
      <Icon icon={icon} className="text-xl" />
    </Link>
  );
};
