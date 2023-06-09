import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  console.log("POSTS FIND");

  if (req.method !== "GET")
    return res.status(405).json({ error: "Metdhod Not Allowed" });

  try {
    const { username, size } = req.query;

    const sizeNumber = parseInt(size);
    if (!sizeNumber || typeof sizeNumber !== "number") {
      return res.status(405).json({ error: "Invalid size" });
    }

    const posts = await prisma.post.findMany({
      where: {
        author: {
          username,
        },
      },
      include: {
        author: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
}
