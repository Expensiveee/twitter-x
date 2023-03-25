import Tweet from "@components/Tweet/Tweet";
import PostTweet from "@components/Tweet/PostTweet";
import MyProfile from "@components/widgets/MyProfile";
import WhoToFollow from "@components/widgets/WhoToFollow";
import FriendsActivity from "@components/widgets/FriendsActivity";

const Tweets = [
  {
    id: 1,
    name: "The h4ck3r",
    username: "the_h4ck3r_off",
    avatar: "/avatar-2.png",
    content: "J'ai sucé pour la première fois! Youpiii",
    date: "2023-03-24",
    likes: 1,
    retweets: 1,
    comments: 0,
    isVerified: false,
    isLiked: true,
    isRetweedted: true,
    isCommented: false,
  },
  {
    id: 2,
    name: "Pause_cafee",
    username: "pause_cafee",
    avatar: "/avatar-1.png",
    content:
      "Joyeux Anniversaire à l'homme supérieur a moi qu'est Sid El Ghali!",
    date: "2022-10-10",
    likes: 0,
    retweets: 1,
    comments: 1,
    isVerified: false,
    isLiked: false,
    isRetweedted: true,
    isCommented: true,
  },
  {
    id: 3,
    name: "Kcid Off",
    username: "kcid_la_moula",
    avatar: "/avatar.png",
    content: "Je suis le roi de la galaxie",
    date: "2023-10-10",
    likes: 1,
    retweets: 0,
    comments: 0,
    isVerified: true,
    isLiked: true,
    isRetweedted: false,
    isCommented: false,
  },
  {
    id: 4,
    name: "Kcid Off",
    username: "kcid_la_moula",
    avatar: "/avatar.png",
    content: "Je suis le roi de la galaxie",
    date: "2023-10-10",
    likes: 1,
    retweets: 0,
    comments: 0,
    isVerified: true,
    isLiked: true,
    isRetweedted: false,
    isCommented: false,
  },
];

export default function Index() {
  return (
    <main className="w-full min-h-[calc(100vh-5.5rem)]">
      <div className="w-full flex gap-4 flex-row">
        <div className="flex h-fit w-1/4 flex-col gap-4 sticky top-[5.5rem] ">
          <MyProfile />
          <FriendsActivity />
        </div>
        <div className="flex w-2/4">
          <div className="flex flex-col w-full gap-4">
            <PostTweet />
            {Tweets.map((tweet) => {
              return <Tweet key={tweet.id} {...tweet} />;
            })}
          </div>
        </div>
        <div className="flex h-fit w-1/4 flex-col gap-4 sticky top-[5.5rem] ">
          <WhoToFollow />
        </div>
      </div>
    </main>
  );
}
