"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import useModalLogin from "@hooks/modal/useModalLogin";
import useUserCurrent from "@hooks/user/useUserCurrent";

import {
  HomeIcon,
  EnvelopeIcon,
  BellIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/20/solid";

import Avatar from "@components/users/Avatar";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const menuItems = [
  {
    name: "Home",
    icon: HomeIcon,
    url: "/",
  },
  {
    name: "Messages",
    icon: EnvelopeIcon,
    url: "/messages",
  },
  {
    name: "Notifications",
    icon: BellIcon,
    url: "/notifications",
  },
];

export default function () {
  const currentUser = useUserCurrent();

  const loginModal = useModalLogin();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser.isLoading && currentUser.data?.username) {
      toast.success(
        <div>
          Welcome back{" "}
          <span className="font-semibold capitalize">
            {currentUser.data?.username}
          </span>{" "}
          !
        </div>
      );
    }
  }, [currentUser.isLoading]);

  const handelSignOut = () => {
    signOut();
    toast.dismiss("Signed out");
  };

  return (
    <nav className="sticky z-40 top-0 w-full mb-2 h-20 bg-twitter-100 flex justify-between">
      <div className="flex  items-center gap-4 w-1/4 select-none">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            alt="Logo"
            src="/logo/twitter-blue.svg"
            width="54"
            height="54"
          />
        </div>
        <div className="flex w-64 h-8 rounded-lg bg-twitter-200 justify">
          <span className="inline-flex text-lg items-center text-gray-400 font-medium px-2">
            #
          </span>
          <input
            className="w-full bg-transparent text-white text-sm font-medium outline-none focus:border-none"
            placeholder="Explore"
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 w-3/4">
        <ul className="flex items-center gap-4 font-medium text-sm">
          {menuItems.map((item, index) => {
            let isActive = pathname == item.url;
            return (
              <Link key={index} href={item.url}>
                <li
                  className={`flex transition-all duration-200 select-none items-center rounded-full cursor-pointer ${
                    isActive ? "bg-white px-3 py-2" : null
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${
                      isActive ? "text-twitter-300" : "text-slate-400"
                    } `}
                  />
                  <span
                    className={`text-black ml-2 ${
                      isActive ? "inline-block" : "hidden"
                    }`}
                  >
                    {item.name}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="w-[1px] h-1/2 bg-gray-700"></div>
        <div className="flex  w-auto items-center justify-end gap-4 select-none">
          {!currentUser.isLoading && !currentUser.isError ? (
            <Link href={currentUser.data?.username}>
              <div
                className={`flex max-w-[180px] w-fit items-center transition cursor-pointer px-1 py-1 rounded-full ${
                  pathname !== `/${currentUser.data?.username}`
                    ? "hover:bg-gray-800 bg-twitter-500 text-twitter-400"
                    : "bg-white text-black"
                }`}
              >
                <div className="w-[32px] h-[32px] px-4 relative">
                  <Avatar
                    className={"rounded-full"}
                    username={currentUser.data?.username}
                    src={currentUser.data?.avatar}
                  />
                </div>
                <span
                  className={`w-full h-full capitalize truncate font-semibold text-sm  ml-2 ${
                    pathname !== `/${currentUser.data?.username}`
                      ? "hidden"
                      : "block"
                  } `}
                >
                  {currentUser.data?.username}
                </span>
                <ArrowDownOnSquareIcon
                  onClick={handelSignOut}
                  className={`w-8 h-8 mr-2 transition hover:text-red-500 cursor-pointer text-twitter-300 ${
                    pathname !== `/${currentUser.data?.username}`
                      ? "hidden"
                      : "block"
                  }`}
                />
              </div>
            </Link>
          ) : (
            <button
              onClick={loginModal.onOpen}
              className="w-40 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border border-twitter-text2 px-4 py-2 rounded-3xl"
            >
              <span className="text-sky-600 font-semibold select-none">
                Login
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
