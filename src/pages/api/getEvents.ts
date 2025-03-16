import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/connectDB";
import { Event } from "@/lib/models/events";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();

    const events = await Event.find().select("");
    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: "Nu exista evenimente la momentul de fata" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
