import bcrypt from "bcrypt";
import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.json({ error: "Method not allowed" });
  try {
    const { email, password, name, username } = req.body;

    if (!email || !password || !name || !username) {
      return res.json({ error: "All fields are required" });
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

    return res.json(user);
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      return res.json({ error: "Email already in use" });
    }

    if (error.code === "P2002" && error.meta.target.includes("username")) {
      return res.json({ error: "Username already in use" });
    }

    return res.json({ error: "Internal Server Error" });
  }
}
