import ReactTimeAgo from "react-time-ago";
import Link from "next/link";
import axios from "axios";

import { useState } from "react";

import { toast } from "react-hot-toast";
import {
  CheckCircleIcon,
  HeartIcon,
  ArrowPathRoundedSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import useUserCurrent from "@hooks/user/useUserCurrent";
import useModalLogin from "@hooks/modal/useModalLogin";

import Avatar from "@components/users/Avatar";
import Spinner from "@components/Spinner";

export default function ({ showDelete = false, tweet, hook }) {
  let { isRetweeted, isCommented, isLiked } = false;

  const [deleteLoading, setDeleteLoading] = useState(false);

  const { id, body, createdAt, author, isVerified } = tweet;
  if (!id) {
    toast.error("Error loading tweet");
    return "No Tweets";
  }

  const loginModal = useModalLogin();
  const currentUser = useUserCurrent();

  const handleAction = (type) => {
    if (currentUser.isError) return loginModal.onOpen();
  };

  const handleDelete = async () => {
    if (deleteLoading) return;

    try {
      setDeleteLoading(true);
      await axios.delete(`/api/posts/delete/${id}`);

      toast.success("Tweet Deleted");

      const newUserPosts = hook.data.filter((post) => post.id !== id);
      hook.mutate([...newUserPosts]);
    } catch (error) {
      console.log(error);
      if (error.response) return toast.error(error.response.data.error);

      toast.error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex px-6 py-4 gap-4 w-full bg-twitter-myProfile rounded-2xl relative">
      <div
        className={`absolute right-5 ${
          showDelete && author.username === currentUser.data?.username
            ? "block"
            : "hidden"
        }`}
      >
        {deleteLoading ? (
          <Spinner size={6} />
        ) : (
          <TrashIcon
            onClick={handleDelete}
            className="w-5 h-5 transition cursor-pointer hover:text-red-500"
          />
        )}
      </div>
      <div className="flex h-auto justify-start">
        <div className="w-10 h-10 relative">
          <Avatar
            className={"rounded-full"}
            src={author.avatar}
            username={author.username}
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-start items-center">
          <span className="font-bold text-twitter-text1">{author.name}</span>
          {isVerified === true ? (
            <CheckCircleIcon className="w-4 h-4 text-twitter-300 mx-1" />
          ) : null}
          <Link href={author.username}>
            <span className="text-twitter-text2 text-sm ml-1 cursor-pointer hover:text-neutral-400 hover:underline transition">
              @{author.username}
            </span>
          </Link>
        </div>
        <div className="mb-2 p-0">
          <span className="text-twitter-text2 text-xs">
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
          </span>
        </div>
        <div>
          <span className="text-twitter-text1 text-lg">{body}</span>
        </div>
        <div className="flex items-center h-auto justify-start mt-8 mb-4">
          <div className="flex w-auto gap-1 items-center justify-start">
            <HeartIcon className="w-6 h-6 cursor-pointer bg-rose-600 rounded-full px-1 py-1 text-white" />
            <ArrowPathRoundedSquareIcon className="w-6 h-6 cursor-pointer bg-emerald-600 rounded-full px-1 py-1 text-white" />
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 cursor-pointer bg-blue-600 rounded-full px-1 py-1 text-white" />
          </div>
          <span className="text-twitter-text2 text-sm ml-2">0</span>
        </div>
        <ul className="flex w-full justify-start gap-2">
          <li
            onClick={() => handleAction("LIKE")}
            className={`w-1/3 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border px-4 py-2 rounded-3xl ${
              isLiked === true ? "border-rose-600" : "border-twitter-text2"
            }`}
          >
            <HeartIcon
              className={`hidden lg:block h-6 w-6 ${
                isLiked === true ? "text-rose-600" : "text-white"
              }`}
            />
            <span className="text-twitter-text1 text-sm select-none">
              {isLiked === true ? <b>Liked</b> : "Like"}
            </span>
          </li>
          <li
            onClick={() => handleAction("RETWEET")}
            className={`w-1/3 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border px-4 py-2 rounded-3xl ${
              isRetweeted === true ? "border-green-600" : "border-twitter-text2"
            }`}
          >
            <ArrowPathRoundedSquareIcon
              className={`hidden lg:block h-6 w-6 ${
                isRetweeted === true ? "text-green-600" : "text-white"
              }`}
            />
            <span className="text-twitter-text1 text-sm select-none">
              {isRetweeted === true ? <b>Retweeted</b> : "Retweet"}
            </span>
          </li>
          <li
            onClick={() => handleAction("COMMENT")}
            className={`w-1/3 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border px-4 py-2 rounded-3xl ${
              isCommented === true ? "border-blue-600" : "border-twitter-text2"
            }`}
          >
            <ChatBubbleOvalLeftEllipsisIcon
              className={`hidden lg:block h-6 w-6 ${
                isCommented === true ? "text-blue-600" : "text-white"
              }`}
            />
            <span className="text-twitter-text1 text-sm select-none">
              {isCommented === true ? <b>Commented</b> : "Comment"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
