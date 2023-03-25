import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

import prisma from "@libs/prisma-client";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      throw new Error("Not authenticated");
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    return res.json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
