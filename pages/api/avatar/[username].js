import prisma from "@libs/prisma-client";

//Create a route that will return the avatar of a user from base64 to img
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

    res.send(user.avatar);

    const avatar = Buffer.from(user.avatar, "base64");

    res.send(avatar);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
}
