import serverAuth from "@libs/server-auth";
import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Metdhod Not Allowed" });

  try {
    const currentUser = await serverAuth(req);
    const { body } = req.body;

    const post = await prisma.post.create({
      data: {
        body,
        authorId: currentUser.id,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
}
