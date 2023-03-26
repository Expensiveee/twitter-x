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

    let base64 = user.avatar.replace(/^data:image\/\w+;base64,/, "");

    let buffer = Buffer.from(base64, "base64");

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
}
