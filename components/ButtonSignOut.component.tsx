"use client";
import { signOut } from "next-auth/react";

export default function ButtonSignOut() {
  return (
    <button className="" onClick={() => signOut()}>
      Se déconnecter
    </button>
  );
}
