import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      throw new Error("Invalid user id");
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: user.id,
        },
      },
    });

    return res.status(200).json({ ...user, followersCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
