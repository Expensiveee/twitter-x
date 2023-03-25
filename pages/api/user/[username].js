import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.json({ error: "Method Not Allowed" });

  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      return res.json({ error: "Invalid user id" });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: user.id,
        },
      },
    });

    return res.json({ ...user, followersCount });
  } catch (error) {
    console.log(error);

    return res.json({ error: "Internal Server Error" });
  }
}
