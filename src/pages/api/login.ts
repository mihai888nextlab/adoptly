import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const db = await connectDB();
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Emailul sau parola sunt invalide." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "Emailul sau parola sunt invalide.",
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, password: user.password },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1d",
      }
    );

    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure=${
        process.env.NODE_ENV === "production"
      }; SameSite=Strict; Path=/; Max-Age=86400`
    );

    return res.status(200).json({ message: "Login succesful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
