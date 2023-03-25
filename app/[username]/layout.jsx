"use client";
import Header from "@components/Header";

import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const path = usePathname();

  return (
    <div className="w-full h-auto flex flex-col">
      <Header path={path} />
      {children}
    </div>
  );
}
