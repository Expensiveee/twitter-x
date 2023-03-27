import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  console.log("POSTS ALL");

  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { size } = req.query;

    const sizeNumber = parseInt(size);
    if (!sizeNumber || typeof sizeNumber !== "number") {
      return res.status(405).json({ error: "Invalid size" });
    }

    const posts = await prisma.post.findMany({
      take: parseInt(size),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        comments: true,
      },
    });

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
