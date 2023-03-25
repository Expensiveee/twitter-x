"use client";

import useCurrentUser from "@hooks/useCurrentUser";

import Banner from "@components/users/Banner";
import Spinner from "@components/Spinner";

export default function () {
  const currentUserHook = useCurrentUser();

  if (currentUserHook.isLoading == false && currentUserHook.isError) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center h-auto min-h-max bg-twitter-myProfile rounded-xl">
      {currentUserHook.isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full h-24">
            <Banner
              className={"rounded-t-xl"}
              bgColor={"bg-twitter-myProfile"}
              withAvatar
              avatarSize={"w-32 h-32"}
              username={currentUserHook.data.username}
            />
          </div>
          <h1 className="mt-16 capitalize text-twitter-text1 text-xl font-bold">
            {currentUserHook.data.name}
          </h1>
          <h3 className="mt-1 text-sm lowercase text-twitter-text2">
            @{currentUserHook.data.username}
          </h3>
          <h2 className="mt-4 text-md text-twitter-text1 mb-4">
            {currentUserHook.data.bio || (
              <i className="text-neutral-300">No bio</i>
            )}
          </h2>
          <div className="flex w-full h-auto border-t border-t-gray-600">
            <div className="flex w-1/2 items-center flex-col border-r border-r-gray-600 py-3">
              <span className="font-bold text-twitter-text1">1</span>
              <span className="text-twitter-text2 mt-1 text-sm">Following</span>
            </div>
            <div className="flex w-1/2 items-center flex-col  py-3">
              <span className="font-bold text-twitter-text1">62,238</span>
              <span className="text-twitter-text2 mt-1 text-sm">Followed</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
