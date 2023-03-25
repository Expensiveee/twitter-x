import bcrypt from "bcrypt";
import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  try {
    const { email, password, name, username } = req.body;

    if (!email || !password || !name || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
        username,
      },
    });

    console.log(user);

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
