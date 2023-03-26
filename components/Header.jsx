import Link from "next/link";
import { usePathname } from "next/navigation";

export default function () {
  if (pathArray.length === 0) {
    return;
  }

  return (
    <div className="w-full gap-2 h-12 flex justify-start items-center">
      {pathArray.map((p, index) => {
        return (
          <div key={index}>
            <Link href={p === "" ? "/" : p.toString()}>
              <span
                className={`text-sm hover:text-white hover:opacity-90 transition capitalize ${
                  index !== pathArray.length - 1
                    ? "text-twitter-400"
                    : "text-white underline"
                }`}
              >
                {p === "" ? "Home" : p}
              </span>
            </Link>

            {index !== pathArray.length - 1 && (
              <span className="text-neutral-400">/</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
