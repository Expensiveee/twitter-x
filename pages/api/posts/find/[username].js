import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Metdhod Not Allowed" });

  try {
    const { username } = req.query;

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
