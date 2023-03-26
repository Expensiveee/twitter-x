"use client";

import useUsers from "@hooks/useUsers";
import useCurrentUser from "@hooks/useCurrentUser";
import useLoginModal from "@hooks/useLoginModal";

import Spinner from "@components/Spinner";
import Avatar from "@components/users/Avatar";

export default function WhoToFollow() {
  const currentUserHook = useCurrentUser();
  const usersHook = useUsers();

  const loginModal = useLoginModal();

  const handleClick = () => {
    if (!currentUserHook.isError) return;

    loginModal.onOpen();
  };

  return (
    <div className="flex px-4 py-4 flex-col items-center max-h-screen h-fit w-full bg-twitter-myProfile rounded-xl overflow-hidden">
      <h1 className="text-lg py-2 text-left w-full text-twitter-text1 font-semibold">
        Who To Follow
      </h1>

      {usersHook.isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full flex flex-col scrollbar-thin scrollbar-thumb-twitter-text2 scrollbar-track-gray-700 scroll-smooth overflow-auto">
          {usersHook.data?.map((user, index) => {
            return (
              <div
                key={index}
                className="flex w-full items-center justify-between mt-6"
              >
                <div className="flex ml-2">
                  <div className="w-10 h-10 relative">
                    <Avatar username={user.username} src={user.avatar} />
                  </div>
                  <div className="flex flex-col ml-2">
                    <h1 className="text-md truncate max-w-[120px] text-twitter-text1">
                      {user.name}
                    </h1>
                    <span className="text-sm truncate max-w-[120px] text-twitter-text2">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <button
                    onClick={handleClick}
                    className="select-none active:bg-slate-300 transition bg-white text-black px-4 py-2 font-medium text-sm rounded-full w-full"
                  >
                    Follow
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
