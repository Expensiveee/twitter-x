import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      return res.status(500).json({ error: "Invalid user id" });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(500).json({ error: "User not found" });
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

    return res.status(500).json({ error: error.message });
  }
}
