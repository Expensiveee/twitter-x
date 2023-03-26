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
        card: "summary_large_image",
        images: [
          `https://twitter-x.expensiveee.me/api/avatar/${params.username}`,
        ],
      },
    };
  } catch (error) {
    return {
      title: "User Not Found",
      description: "No Bio",
      twitter: {
        card: "summary_large_image",
        images: ["/banner.jpg"],
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
