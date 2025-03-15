import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/connectDB";
import { Pet } from "@/lib/models/pet";

const handler = async ( req: NextApiRequest, res: NextApiResponse) =>{
    try{
       await connectDB();

       const pets = await Pet.find({disponibil: "Liber pentru adoptie"}).select("");
       if(!pets || pets.length === 0){
            return res.status(404).json({ message: "No available pets" });
       }
       res.status(200).json(pets);

    }catch( error){
        console.error("Error fetching pets:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default handler;