"use client";
import axios from "axios";

import { useState } from "react";

import { toast } from "react-hot-toast";
import {
  CameraIcon,
  PlayCircleIcon,
  CalendarDaysIcon,
  ListBulletIcon,
} from "@heroicons/react/20/solid";

import useUserCurrent from "@hooks/user/useUserCurrent";

import Avatar from "@components/users/Avatar";
import Spinner from "@components/Spinner";
import usePostsAll from "@hooks/post/usePostsAll";

export default function ({}) {
  const [loading, setLoading] = useState(false);
  const [tweetBody, setTweetBody] = useState("");

  const currentUser = useUserCurrent();
  const allPosts = usePostsAll(30);

  const handleClick = async () => {
    if (loading) return;

    if (allPosts.isLoading) return toast.error("Please wait for posts to load");

    try {
      setLoading(true);

      const newPost = await axios.post("/api/posts/create", {
        body: tweetBody,
      });
      setTweetBody("");
      toast.success("Tweeted");

      allPosts.mutate([newPost.data, ...allPosts.data]);
    } catch (error) {
      console.log(error);
      if (error.response) return toast.error(error.response.data.error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex px-6 py-4 gap-4 flex-col w-full bg-twitter-myProfile rounded-2xl">
      <div className="flex items-center justify-center select-none">
        <div className="w-auto">
          <div className={`w-10 h-10 rounded-full relative`}>
            <Avatar
              src={currentUser.data?.avatar}
              username={currentUser.data?.username}
              className={`rounded-full`}
            />
          </div>
        </div>
        <input
          onChange={(e) => setTweetBody(e.target.value)}
          value={tweetBody}
          className="w-full ml-2 px-4 h-12 rounded bg-twitter-500 text-white text-md font-medium outline-none"
          placeholder="What's happening?"
          type="text"
          disabled={loading}
        />

        {loading ? (
          <div className="w-auto h-auto px-4">
            <Spinner size={8} />
          </div>
        ) : (
          <button
            onClick={handleClick}
            disabled={loading}
            className="w-1/4 disabled:cursor-not-allowed duration-100 ml-2 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border border-twitter-300 px-4 py-2 rounded-3xl"
          >
            <span className="text-twitter-text1 text-sm select-none">
              Tweet
            </span>
          </button>
        )}
      </div>
      <ul className="flex w-[calc(100%-60px)] flex-wrap lg:flex-nowrap mx-auto gap-2 justify-evenly">
        <li className="w-1/4 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border border-twitter-text2 px-4 py-2 rounded-3xl">
          <CameraIcon className="hidden lg:block h-6 w-6 text-green-500" />
          <span className="text-twitter-text1 text-sm select-none">Photo</span>
        </li>
        <li className="w-1/4 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border border-twitter-text2 px-4 py-2 rounded-3xl">
          <PlayCircleIcon className="hidden lg:block h-6 w-6 text-blue-500" />
          <span className="text-twitter-text1 text-sm select-none">Video</span>
        </li>
        <li className="w-1/4 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border border-twitter-text2 px-4 py-2 rounded-3xl">
          <CalendarDaysIcon className="hidden lg:block h-6 w-6 text-red-500" />
          <span className="text-twitter-text1 text-sm select-none">
            Schedule
          </span>
        </li>
        <li className="w-1/4 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border border-twitter-text2 px-4 py-2 rounded-3xl">
          <ListBulletIcon className="hidden lg:block h-6 w-6 text-yellow-500" />
          <span className="text-twitter-text1 text-sm select-none">Thread</span>
        </li>
      </ul>
    </div>
  );
}
