import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB(); 

    const shelters = await User.find({ role: "shelter" }).select("-password");
    
    if (!shelters || shelters.length === 0) {
      return res.status(404).json({ message: "No shelters found" });
    }

    console.log("Shelters fetched:", shelters); // ✅ Log to verify data

    res.status(200).json(shelters);
  } catch (error) {
    console.error("Error fetching shelters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
