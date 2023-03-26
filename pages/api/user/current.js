import serverAuth from "@libs/server-auth";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const currentUser = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
