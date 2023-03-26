import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Metdhod Not Allowed" });

  try {
    const { type, username } = req.query;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const base64String = type === "avatar" ? user.avatar : user.banner;
    const base64 = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

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
