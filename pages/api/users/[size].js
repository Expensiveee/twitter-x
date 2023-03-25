import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  try {
    const { size } = req.query;

    if (!size || typeof size !== "string") {
      throw new Error("Invalid size");
    }

    // If size is "all", return all users
    if (size === "all") {
      const allUsers = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(allUsers);
    }

    // If size is not "all", return users based on size
    const users = await prisma.user.findMany({
      take: parseInt(size),
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
