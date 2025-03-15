import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
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

    connectDB();
    const user = await User.findOne({ _id, email, password }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default handler;
