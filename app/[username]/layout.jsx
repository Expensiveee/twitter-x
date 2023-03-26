import WhoToFollow from "@components/widgets/WhoToFollow";
import axios from "axios";

export async function generateMetadata({ params }) {
  try {
    const res = await axios.get(
      `https://twitter-x.expensiveee.me/api/user/${params.username}`
    );

    return {
      title: `${res.data.username}'s profile on TwitterX`,
      description: res.data.bio,
      twitter: {
        images: {
          title: `${res.data?.username}'s profile on TwitterX`,
          description: res.data?.bio ?? "No Bio",
          card: "summary_large_image",
          url:
            res.data?.banner ?? "https://twitter-x.expensiveee.me/banner.jpg",
          alt: "User Banner ",
        },
      },
    };
  } catch (error) {
    return {
      title: "User Not Found",
      description: "T'as déjà K avec un 12 ?",
      twitter: {
        images: {
          title: "User Not Found",
          description: "T'as déjà K avec un 12 ?",
          card: "summary_large_image",
          url: "https://twitter-x.expensiveee.me/banner.jpg",
          alt: "Default Banner ",
        },
      },
    };
  }
}

export default function Layout({ children }) {
  return (
    <div className="flex gap-4 flex-row w-full min-h-96 relative">
      <div className="flex flex-col w-4/6 h-auto">{children}</div>
      <div className="w-2/6 flex flex-col h-fit sticky z-30 top-[5.5rem]">
        <WhoToFollow />
      </div>
    </div>
  );
}
