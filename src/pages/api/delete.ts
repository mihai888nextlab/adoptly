import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/connectDB";
import { Pet } from "@/lib/models/pet";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        try {
            await connectDB();

            const { petId } = req.body;

            if (!petId) {
                return res.status(400).json({ message: "Pet ID is required" });
            }

            const deletedPet = await Pet.findByIdAndDelete(petId);

            if (!deletedPet) {
                return res.status(404).json({ message: "Pet not found" });
            }

            return res.status(200).json({ message: "Pet deleted successfully" });
        } catch (error) {
            const err = error as Error;
            console.error("Error deleting pet:", err.message);
            return res.status(500).json({ message: "Server error", error: err.message });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
};

export default handler;
