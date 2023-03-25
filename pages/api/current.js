import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.json({ error: "Method Not Allowed" });

  try {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      return res.json({ error: "Not Authentificated" });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return res.json({ error: "User not found" });
    }

    return res.json(currentUser);
  } catch (error) {
    console.log(error);

    return res.json({ error: "Internal Server Error" });
  }
}
