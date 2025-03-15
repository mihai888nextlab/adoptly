import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/connectDB";
import { Pet } from "@/lib/models/pet";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    const { _id, email, password } = JSON.parse(
      decoded ? JSON.stringify(decoded) : "{}"
    );

    const db = await connectDB();
    const pets = await Pet.find({ addedBy: _id }).select("");
    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets uploaded by this user" });
    }
    res.status(200).json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
