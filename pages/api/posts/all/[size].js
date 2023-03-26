import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { size } = req.query;

    if (!size || typeof size !== "string") {
      return res.status(405).json({ error: "Invalid size" });
    }

    // If size is "all", return all users
    if (size === "-1") {
      const allPosts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          comments: true,
        },
      });

      return res.json(allPosts);
    }

    // If size is not "all", return users based on size
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
