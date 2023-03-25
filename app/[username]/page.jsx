"use client";

import useUser from "@hooks/useUser";

import Spinner from "@components/Spinner";
import Banner from "@components/users/Banner";

export default function UserProfile({ params }) {
  const userHook = useUser(params?.username);

  const handleClick = () => {
    window.history.back();
  };

  if (userHook.isLoading === true) {
    return <Spinner />;
  }

  if (userHook.isError) {
    return (
      <div className="flex flex-col gap-4  w-full items-center justify-center mt-20">
        <h1 className="text-center w-5/6">
          Hmm... this page doesn’t exist. Try searching for something else.
        </h1>
        <button
          className="w-40 disabled:cursor-not-allowed py-3 active:bg-slate-300 transition bg-white text-black rounded-full"
          onClick={handleClick}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full h-96 bg-twiter-200">
      <div className="w-full h-40">
        <Banner
          className={"rounded-t-xl"}
          bgColor={"bg-twitter-100"}
          withAvatar
          avatarSize={"w-32 h-32"}
          username={userHook.data.username}
        />
      </div>
    </div>
  );
}
