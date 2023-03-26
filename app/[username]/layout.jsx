import WhoToFollow from "@components/widgets/WhoToFollow";
import axios from "axios";

export async function generateMetadata({ params }) {
  const res = await axios.get(
    `https://twitter-x.expensiveee.me/api/user/${params.username}`
  );

  if (!res.ok)
    return { title: "User Not Found", description: "T'as déjà K avec un 12 ?" };

  return { title: res.data.username, description: res.data.bio };
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
