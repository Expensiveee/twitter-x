"use client";

import useUsers from "@hooks/useUsers";
import useCurrentUser from "@hooks/useCurrentUser";
import useLoginModal from "@hooks/useLoginModal";

import Spinner from "@components/Spinner";
import Avatar from "@components/users/Avatar";

import Link from "next/link";

export default function WhoToFollow() {
  const currentUserHook = useCurrentUser();
  const usersHook = useUsers(2);

  const loginModal = useLoginModal();

  const handleClick = () => {
    if (!currentUserHook.isError) return;

    loginModal.onOpen();
  };

  return (
    <div className="flex w-full px-4 py-4 flex-col items-center h-auto min-h-max bg-twitter-myProfile rounded-xl">
      <h1 className="text-lg text-left w-full text-twitter-text1 font-semibold">
        Who To Follow
      </h1>

      {usersHook.isLoading ? (
        <div className="py-10">
          <Spinner size={10} />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col scrollbar-thin scrollbar-thumb-twitter-text2 scrollbar-track-gray-700 scroll-smooth overflow-auto">
          {usersHook.data?.map((user, index) => {
            return (
              <Link href={user?.username} key={index}>
                <div className="flex active:scale-95 px-2 py-2 rounded-xl w-full items-center justify-between mt-3 cursor-pointer transition hover:bg-twitter-500">
                  <div className="flex">
                    <div className="w-10 h-10 relative">
                      <Avatar className={"rounded-full"} src={user.avatar} />
                    </div>
                    <div className="flex flex-col ml-2">
                      <h1 className="text-sm truncate max-w-[120px] text-twitter-text1">
                        {user.name}
                      </h1>
                      <span className="text-xs truncate max-w-[120px] text-twitter-text2">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                  <div className="flex ml-4">
                    <button
                      onClick={handleClick}
                      className="select-none active:bg-slate-300 transition bg-white text-black px-3 py-2 font-medium text-xs rounded-full w-fit"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
