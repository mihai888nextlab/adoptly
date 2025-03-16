import { connectDB } from "@/lib/connectDB";
import { Pet } from "@/lib/models/pet";
import { NextApiRequest, NextApiResponse } from "next";

// Change the disponibility to "In process de adoptie"
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Ensure it's a PATCH request (you can change this based on your use case)
    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        // Connect to the database
        await connectDB();

        // Get the pet ID from the request body
        const { petId } = req.body;

        // If petId is not provided, return an error
        if (!petId) {
            return res.status(400).json({ message: "Pet ID is required" });
        }

        // Update the pet's 'disponibil' field to 'In process de adoptie'
        const updatedPet = await Pet.findByIdAndUpdate(
            petId,
            { $set: { disponibil: "Liber pentru adoptie" } },
            { new: true } // Return the updated document
        );

        // If no pet is found with the provided petId, return an error
        if (!updatedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // Send the updated pet as the response
        return res.status(200).json(updatedPet);

    } catch (err) {
        // If any error occurs, log it and return a 500 error
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export default handler;
