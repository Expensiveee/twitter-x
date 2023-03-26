export default function () {
  return (
    <div className="flex w-full px-4 py-2 flex-col items-center h-auto bg-twitter-myProfile rounded-xl">
      <h1 className="text-lg py-2 text-left w-full text-twitter-text1 font-semibold">
        Friends Activity
      </h1>

      <ul className="flex gap-4 flex-col scrollbar-thin pr-1 pb-4 scrollbar-thumb-twitter-text2 scrollbar-track-gray-700 scroll-smooth overflow-auto w-full max-h-96">
        <li className="flex flex-full items-center">
          <img className="w-8 h-8 rounded-full" src="/avatar-2.png" alt="" />
          <h2 className="text-twitter-400 ml-2 text-sm">
            <span className="font-bold">The h4ck3r</span> s'est abonné à
            @Amouranth
          </h2>
        </li>
        <li className="flex flex-full items-center">
          <img
            className="w-8 h-8 rounded-full"
            src="/avatar-1.png"
            alt="Avatar"
          />
          <h2 className="text-twitter-400 ml-2 text-sm">
            <span className="font-bold">Pause_cafee</span> s'est branlé sur
            Silvester
          </h2>
        </li>
      </ul>
    </div>
  );
}
