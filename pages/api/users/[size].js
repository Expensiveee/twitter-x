import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  try {
    const { size } = req.query;

    if (!size || typeof size !== "string") {
      return res.json({ error: "Invalid size" });
    }

    // If size is "all", return all users
    if (size === "all") {
      const allUsers = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.json(allUsers);
    }

    // If size is not "all", return users based on size
    const users = await prisma.user.findMany({
      take: parseInt(size),
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
