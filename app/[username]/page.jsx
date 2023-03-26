"use client";
import { toast } from "react-hot-toast";
import { ShareIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";

import useUser from "@hooks/useUser";
import useCurrentUser from "@hooks/useCurrentUser";
import useEditModal from "@hooks/useEditModal";
import usePosts from "@hooks/usePosts";

import Spinner from "@components/Spinner";
import Banner from "@components/users/Banner";
import Avatar from "@components/users/Avatar";
import Tweet from "@components/Tweet/Tweet";
import WhoToFollow from "@components/widgets/WhoToFollow";
import axios from "axios";

export async function generateMetadata({ params }) {
  const res = await axios.get(`/api/user/${params.username}`);

  if (!res.ok)
    return { title: "User Not Found", description: "T'as déjà K avec un 12 ?" };

  return { title: res.data.username, description: res.data.bio };
}

export default function ({ params }) {
  const userHook = useUser(params?.username);
  const currentUser = useCurrentUser();
  const posts = usePosts(userHook.data?.username);

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
    <>
      <div className="flex gap-4 flex-row w-full min-h-96 relative">
        <div className="flex flex-col w-4/6 h-auto">
          <div className="w-full h-40">
            <Banner className={"rounded-t-xl"} src={userHook.data?.banner} />
            <h1>
              {userHook.data.username}{" "}
              {userHook.data.isVerified && <Verified />}
            </h1>
          </div>
          <div className="w-full gap-10 flex flex-row items-center justify-center h-20  bg-twitter-200">
            <div className="flex w-full justify-center items-center text-sm gap-4">
              <div className="flex flex-col w-auto items-center justify-center">
                <h2 className="font-medium">Followers</h2>
                <span className="text-xs text-white">
                  {userHook.data.followersCount}
                </span>
              </div>
              <div className="flex flex-col w-auto items-center justify-center">
                <h2 className="font-medium">Following</h2>
                <span className="text-xs text-white">
                  {userHook.data.followersCount}
                </span>
              </div>
              <div className="flex flex-col w-auto items-center justify-center">
                <h2 className="font-medium">Posts</h2>
                <span className="text-xs text-white">0</span>
              </div>
            </div>
            <div className="w-auto flex items-center justify-center">
              <div className="w-32 h-32 relative rounded-full">
                <Avatar
                  className={"px-2 py-2 rounded-full bg-twitter-100"}
                  src={userHook.data.avatar}
                  username={userHook.data.username}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center gap-4">
              <div className="flex flex-col w-auto items-center justify-center">
                {currentUser.data?.id !== userHook.data.id ? (
                  <button className="w-fit text-sm  flex px-3 py-2 hover:opacity-90 transition bg-twitter-300 text-white font-medium cursor-pointer rounded-full">
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={editModal.onOpen}
                    className="w-fit items-center text-sm  flex px-3 py-2 hover:opacity-90 transition bg-twitter-300 text-white font-medium cursor-pointer rounded-full"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              <div className="flex flex-col w-auto items-center justify-center">
                {currentUser.data?.id !== userHook.data.id ? (
                  <button className="w-fit text-sm  flex px-3 py-2 hover:opacity-90 transition bg-twitter-300 text-white font-medium cursor-pointer rounded-full">
                    Message
                  </button>
                ) : (
                  <button
                    onClick={handleCopyProfileLink}
                    className="w-fit items-center text-sm flex px-2 py-2 hover:opacity-90 transition bg-twitter-300 text-white font-medium cursor-pointer rounded-full"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex-col mt-2 gap-10 rounded-b-2xl flex items-center justify-center h-auto py-10 bg-twitter-200">
            <div className="flex w-full h-auto justify-center items-center gap-4">
              <h1 className="text-white max-w-sm break-words text-center text-md">
                {userHook.data?.bio ?? "No Bio"}
              </h1>
            </div>
          </div>
          <section className="w-full h-auto mt-20 pb-6">
            <h1 className="w-full text-white text-left py-4 text-4xl">
              Tweets
            </h1>
            <div className="flex w-full">
              <div className="flex flex-col w-full gap-4">
                {posts.data?.map((tweet) => {
                  return <Tweet showDelete key={tweet.id} {...tweet} />;
                })}
              </div>
            </div>
          </section>
        </div>
        <div className="w-2/6 flex flex-col h-fit sticky z-30 top-[5.5rem]">
          <WhoToFollow />
        </div>
      </div>
    </>
  );
}
