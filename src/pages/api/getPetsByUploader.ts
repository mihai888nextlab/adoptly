import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/connectDB";
import { Pet } from "@/lib/models/pet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uploader } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!uploader) {
    return res.status(400).json({ message: "Uploader is required" });
  }

  try {
    const db = await connectDB();
    const pets = await Pet.find({ uploader }).select("");
    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets uploaded by this user" });
    }
    res.status(200).json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
