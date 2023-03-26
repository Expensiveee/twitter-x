"use client";

import axios from "axios";

import Tweet from "@components/Tweet/Tweet";
import PostTweet from "@components/Tweet/PostTweet";
import MyProfile from "@components/widgets/MyProfile";
import WhoToFollow from "@components/widgets/WhoToFollow";
import FriendsActivity from "@components/widgets/FriendsActivity";

import usePostsAll from "@hooks/post/usePostsAll";

export default function Index() {
  const allPosts = usePostsAll(30);

  return (
    <main className="w-full min-h-[calc(100vh-5.5rem)] pb-6">
      <div className="w-full flex gap-4 flex-row">
        <div className="flex h-fit w-1/4 flex-col gap-4 sticky top-[5.5rem] ">
          <MyProfile />
        </div>
        <div className="flex w-2/4">
          <div className="flex flex-col w-full gap-4">
            <PostTweet />
            {allPosts.data?.map((t) => {
              return <Tweet key={t.id} tweet={t} />;
            })}
          </div>
        </div>
        <div className="flex overflow-y-hidden h-fit w-1/4 flex-col gap-4 sticky top-[5.5rem] ">
          <WhoToFollow />
          <FriendsActivity />
        </div>
      </div>
    </main>
  );
}
