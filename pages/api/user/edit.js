import serverAuth from "@libs/server-auth";
import prisma from "@libs/prisma-client";

export default async function (req, res) {
  if (req.method !== "PATCH")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const currentUser = await serverAuth(req);

    const { username } = currentUser;

    const { name, bio, avatar, banner } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        username: "Expensiveee_Off",
      },
      data: {
        name,
        bio,
        avatar,
        banner,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
