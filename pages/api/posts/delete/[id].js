import serverAuth from "@libs/server-auth";
import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method === "GET")
    return res.status(405).json({ error: "Metdhod Not Allowed" });

  try {
    const currentUser = await serverAuth(req);
    const { id } = req.query;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (post.authorId !== currentUser.id) {
      return res
        .status(403)
        .json({ error: "Not allowed to delete this tweet" });
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
}
