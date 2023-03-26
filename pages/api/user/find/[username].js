import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Metdhod Not Allowed" });

  try {
    const { username } = req.query;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
}
