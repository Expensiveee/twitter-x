"use client";
import { toast } from "react-hot-toast";
import { ShareIcon } from "@heroicons/react/20/solid";

import useUser from "@hooks/user/useUser";
import useUserCurrent from "@hooks/user/useUserCurrent";
import useModalEdit from "@hooks/modal/useModalEdit";
import usePostsUser from "@hooks/post/usePostsUser";

import Spinner from "@components/Spinner";
import Banner from "@components/users/Banner";
import Avatar from "@components/users/Avatar";
import Tweet from "@components/Tweet/Tweet";

export default function ({ params }) {
  const user = useUser(params?.username);

  const userPosts = usePostsUser(user.data?.username, 30);

  const currentUser = useUserCurrent();

  const editModal = useModalEdit();

  const handleGoBackOnError = () => {
    window.history.back();
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location);

    toast.success("Copied profile link to clipboard");
  };

  if (user.isLoading || currentUser.isLoading) {
    return <Spinner />;
  }

  //Error Page for when the user isn't found
  if (user.isError) {
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
    <div className="w-full h-auto">
      <div className="w-full h-40">
        <Banner className={"rounded-t-xl"} src={user.data?.banner} />
      </div>
      <div className="w-full gap-10 flex flex-row items-center justify-center h-20  bg-twitter-200">
        <div className="flex w-full justify-center items-center text-sm gap-4">
          <div className="flex flex-col w-auto items-center justify-center">
            <h2 className="font-medium">Followers</h2>
            <span className="text-xs text-white">0</span>
          </div>
          <div className="flex flex-col w-auto items-center justify-center">
            <h2 className="font-medium">Following</h2>
            <span className="text-xs text-white">0</span>
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
              src={user.data.avatar}
              username={user.data.username}
            />
          </div>
        </div>
        <div className="flex w-full justify-center items-center gap-4">
          <div className="flex flex-col w-auto items-center justify-center">
            {currentUser.data?.id !== user.data.id ? (
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
            {user.data?.id !== currentUser.data?.id ? (
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
            {user.data?.bio ?? "No Bio"}
          </h1>
        </div>
      </div>
      <section className="w-full h-auto mt-20 pb-6">
        <h1 className="w-full text-white text-left py-4 text-4xl">Tweets</h1>
        <div className="flex w-full">
          <div className="flex flex-col w-full gap-4">
            {userPosts.data?.map((t) => {
              return <Tweet showDelete key={t.id} tweet={t} hook={userPosts} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
