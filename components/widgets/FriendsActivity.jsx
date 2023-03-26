"use client";

import useUserCurrent from "@hooks/user/useUserCurrent";

import Spinner from "@components/Spinner";
import Avatar from "@components/users/Avatar";

export default function FriendsActivity() {
  const currentUser = useUserCurrent();

  if (currentUser.isError) return;

  return (
    <div className="flex w-full px-4 py-4 flex-col items-center h-auto min-h-max bg-twitter-myProfile rounded-xl">
      <h1 className="text-lg text-left w-full text-twitter-text1 font-semibold">
        Friend Activity
      </h1>

      {currentUser.isLoading ? (
        <div className="py-10">
          <Spinner size={10} />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col scrollbar-thin scrollbar-thumb-twitter-text2 scrollbar-track-gray-700 scroll-smooth overflow-auto">
          <div className="flex active:scale-95 px-2 py-2 rounded-xl w-full items-center justify-between mt-3 cursor-pointer transition hover:bg-twitter-500">
            <div className="flex">
              <div className="w-10 h-10 relative">
                <Avatar className={"rounded-full"} src={"/avatar-1.png"} />
              </div>
              <div className="flex flex-col ml-2">
                <h1 className="text-sm truncate max-w-[120px] text-twitter-text1">
                  Adam Maras
                </h1>
                <span className="text-xs truncate max-w-full text-twitter-text2">
                  Est passé diamant sur OW
                </span>
              </div>
            </div>
          </div>
          <div className="flex active:scale-95 px-2 py-2 rounded-xl w-full items-center justify-between mt-1 cursor-pointer transition hover:bg-twitter-500">
            <div className="flex max-w-full truncate overflow-y-hidden">
              <div className="w-10 h-10 relative">
                <Avatar className={"rounded-full"} src={"/avatar-2.png"} />
              </div>
              <div className="flex max-w-full truncate overflow-y-hidden flex-col ml-2">
                <h1 className="text-sm truncate max-w-[120px] text-twitter-text1">
                  Zimo
                </h1>
                <span className="text-xs truncate maxw-full text-twitter-text2">
                  S'est abonné à MonsieurDream
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
