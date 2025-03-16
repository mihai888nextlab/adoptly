import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/connectDB"; // Assuming you have a connection helper
import { Pet } from "@/lib/models/pet"; // Assuming this is your Pet model

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        try {
            // Connect to the database
            await connectDB();

            // Extract petId from the request body
            const { petId } = req.body;

            if (!petId) {
                return res.status(400).json({ message: "Pet ID is required" });
            }

            // Find and delete the pet with the given ID
            const deletedPet = await Pet.findByIdAndDelete(petId);

            if (!deletedPet) {
                return res.status(404).json({ message: "Pet not found" });
            }

            // Respond with a success message
            return res.status(200).json({ message: "Pet deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
};

export default handler;
