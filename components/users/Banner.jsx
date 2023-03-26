import Image from "next/image";

export default function ({ className, src }) {
  return (
    <div className="w-full h-full flex select-none relative">
      <Image
        className={`w-full h-auto overflow-hidden ${className}`}
        src={src ?? "/banner.jpg"}
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
