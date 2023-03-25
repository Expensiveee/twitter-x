import {
  CameraIcon,
  PlayCircleIcon,
  CalendarDaysIcon,
  ListBulletIcon,
} from "@heroicons/react/20/solid";

export default function () {
  return (
    <div className="flex px-6 py-4 gap-4 flex-col w-full bg-twitter-myProfile rounded-2xl">
      <div className="flex items-center justify-center select-none">
        <img
          className="w-14 h-14 rounded-full"
          src="/avatar.png"
          alt="User's Avatar"
        />
        <input
          className="w-full ml-2 px-4 h-12 rounded bg-twitter-500 text-white text-md font-medium outline-none"
          placeholder="What's happening?"
          type="text"
        />
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
