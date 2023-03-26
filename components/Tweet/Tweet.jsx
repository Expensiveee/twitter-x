import {
  CheckCircleIcon,
  HeartIcon,
  ArrowPathRoundedSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/20/solid";

export default function ({
  id,
  name,
  username,
  avatar,
  content,
  date,
  likes,
  retweets,
  comments,
  isVerified,
  isLiked,
  isRetweedted,
  isCommented,
}) {
  return (
    <div className="flex px-6 py-4 gap-4 w-full bg-twitter-myProfile rounded-2xl">
      <div className="flex h-auto justify-start">
        <img
          className="w-[56px] h-[56px] rounded-full"
          src={avatar}
          alt="Avatar"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-start items-center">
          <span className="font-bold text-twitter-text1">{name}</span>
          {isVerified === true ? (
            <CheckCircleIcon className="w-4 h-4 text-twitter-300 mx-1" />
          ) : null}
          <span className="text-twitter-text2 text-sm ml-1">@{username}</span>
        </div>
        <div className="my-1">
          <span className="text-twitter-text2 text-sm">{date}</span>
        </div>
        <div>
          <span className="text-twitter-text1 text-lg">{content}</span>
        </div>
        <div className="flex items-center h-auto justify-start my-6">
          <div className="flex w-auto gap-1 items-center justify-start">
            <HeartIcon className="w-6 h-6 cursor-pointer bg-rose-600 rounded-full px-1 py-1 text-white" />
            <ArrowPathRoundedSquareIcon className="w-6 h-6 cursor-pointer bg-emerald-600 rounded-full px-1 py-1 text-white" />
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 cursor-pointer bg-blue-600 rounded-full px-1 py-1 text-white" />
          </div>
          <span className="text-twitter-text2 text-sm ml-2">
            {likes + comments + retweets}
          </span>
        </div>
        <ul className="flex w-full justify-start gap-2">
          <li
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
            className={`w-1/3 duration-100 active:bg-twitter-500 justify-center inline-flex cursor-pointer gap-2 items-center border px-4 py-2 rounded-3xl ${
              isRetweedted === true
                ? "border-green-600"
                : "border-twitter-text2"
            }`}
          >
            <ArrowPathRoundedSquareIcon
              className={`hidden lg:block h-6 w-6 ${
                isRetweedted === true ? "text-green-600" : "text-white"
              }`}
            />
            <span className="text-twitter-text1 text-sm select-none">
              {isRetweedted === true ? <b>Retweeted</b> : "Retweet"}
            </span>
          </li>
          <li
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
