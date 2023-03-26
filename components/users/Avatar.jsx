"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ({ className, src, username }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${username}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transition hover:opacity-90 w-full h-full`}
    >
      <Image
        className={`rounded-full ${className}`}
        src={src ?? "/avatar.png"}
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
