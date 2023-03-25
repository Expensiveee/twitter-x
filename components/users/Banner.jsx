import Avatar from "@components/users/Avatar";
import Image from "next/image";

export default function ({
  withAvatar,
  bgColor,
  avatarSize,
  className,
  username,
}) {
  return (
    <div className="w-full h-full flex select-none relative">
      <Image
        className={`w-full h-auto overflow-hidden ${className}`}
        src="/banner.jpg"
        fill
        style={{ objectFit: "cover" }}
      />
      {withAvatar ? (
        <div
          className={`${avatarSize} rounded-full absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
        >
          <Avatar username={username} className={`px-2 py-2 ${bgColor}`} />
        </div>
      ) : null}
    </div>
  );
}
