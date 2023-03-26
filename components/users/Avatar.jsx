"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ({ className, src, username }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${username}`);
  };

  if (username && typeof username === "string") {
    return (
      <Image
        alt="Avatar"
        onClick={handleClick}
        draggable={false}
        className={`${className} select-none active:scale-95 cursor-pointer hover:opacity-80 transition`}
        src={src ?? "/avatar.png"}
        fill
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <Image
      alt="Avatar"
      className={className}
      src={src ?? "/avatar.png"}
      fill
      style={{ objectFit: "cover" }}
    />
  );
}
