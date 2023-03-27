import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  try {
    const { size } = req.query;

    const sizeNumber = parseInt(size);
    if (!sizeNumber || typeof sizeNumber !== "number") {
      return res.status(405).json({ error: "Invalid size" });
    }

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
