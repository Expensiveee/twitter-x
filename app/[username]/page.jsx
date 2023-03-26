"use client";

import { toast } from "react-hot-toast";

import { ShareIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";

import useUser from "@hooks/useUser";
import useCurrentUser from "@hooks/useCurrentUser";
import useEditModal from "@hooks/useEditModal";

import Spinner from "@components/Spinner";
import Banner from "@components/users/Banner";
import Avatar from "@components/users/Avatar";
import { useRouter } from "next/navigation";

export default function ({ params }) {
  const userHook = useUser(params?.username);
  const currentUser = useCurrentUser();

  const editModal = useEditModal();

  const handleGoBackOnError = () => {
    window.history.back();
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location);

    toast.success("Copied profile link to clipboard");
  };

  if (userHook.isLoading || currentUser.isLoading) {
    return <Spinner />;
  }

  //Error Page for when the user isn't found
  if (userHook.isError) {
    return (
      <div className="flex flex-col gap-4  w-full items-center justify-center mt-20">
        <h1 className="text-center w-5/6">
          Hmm... this page doesn’t exist. Try searching for something else.
        </h1>
        <button
          className="w-40 disabled:cursor-not-allowed py-3 active:bg-slate-300 transition bg-white text-black rounded-full"
          onClick={handleGoBackOnError}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-96 ">
      <div className="w-full h-40">
        <Banner className={"rounded-t-xl"} src={userHook.data?.banner} />
        <h1>
          {userHook.data.username} {userHook.data.isVerified && <Verified />}
        </h1>
      </div>
      <div className="w-full gap-10 flex flex-row items-center justify-center h-20  bg-twitter-200">
        <div className="flex w-full justify-evenly items-center gap-4">
          <div className="flex flex-col w-auto items-center justify-center">
            <h2 className="font-medium">Followers</h2>
            <span>{userHook.data.followersCount}</span>
          </div>
          <div className="flex flex-col w-auto items-center justify-center">
            <h2 className="font-medium">Following</h2>
            <span className="text-sm text-white">
              {userHook.data.followersCount}
            </span>
          </div>
          <div className="flex flex-col w-auto items-center justify-center">
            <h2 className="font-medium">Comments</h2>
            <span className="text-sm text-white">0</span>
          </div>
          <div className="flex flex-col w-auto items-center justify-center">
            <h2 className="font-medium">Posts</h2>
            <span className="text-sm text-white">0</span>
          </div>
        </div>
        <div className="w-auto flex items-center justify-center">
          <div className="w-32 h-32 relative rounded-full">
            <Avatar
              className={"px-2 py-2 bg-twitter-100"}
              src={userHook.data.avatar}
              username={userHook.data.username}
            />
          </div>
        </div>
        <div className="flex w-full justify-evenly items-center gap-4">
          <div className="flex flex-col w-auto items-center justify-center">
            <h2 className="font-medium">Joined</h2>
            <span className="w-full flex h-auto items-center justify-center text-sm text-white">
              <CalendarDaysIcon className="w-4 h-4 mr-1" />
              {new Date(userHook.data.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col w-auto items-center justify-center">
            {currentUser.data?.id !== userHook.data.id ? (
              <button className="w-fit flex px-6 py-3 hover:opacity-90 transition bg-twitter-300 text-white font-medium cursor-pointer rounded-full">
                Follow
              </button>
            ) : (
              <button
                onClick={editModal.onOpen}
                className="w-fit items-center flex px-6 py-3 hover:opacity-90 transition bg-twitter-300 text-white font-medium cursor-pointer rounded-full"
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="flex flex-col w-auto items-center justify-center">
            {currentUser.data?.id !== userHook.data.id ? (
              <button className="w-fit flex px-6 py-3 hover:opacity-90 transition bg-twitter-300 text-white font-medium cursor-pointer rounded-full">
                Message
              </button>
            ) : (
              <button
                onClick={handleCopyProfileLink}
                className="w-fit items-center flex px-6 py-3 hover:opacity-90 transition bg-twitter-300 text-white font-medium cursor-pointer rounded-full"
              >
                <ShareIcon className="w-4 h-4 mr-2" />
                Copy profile link
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex-col mt-2 gap-10 rounded-b-2xl flex items-center justify-center h-auto py-10 bg-twitter-200">
        <div className="flex w-full h-auto justify-center items-center gap-4">
          <h1 className="text-white max-w-sm break-words text-center text-lg">
            {userHook.data?.bio ?? "No Bio"}
          </h1>
        </div>
      </div>
    </div>
  );
}
