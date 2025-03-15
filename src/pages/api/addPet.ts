import { connectDB } from "@/lib/connectDB";
import { Pet } from "@/lib/models/pet";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    nume,
    specie,
    rasa,
    varstaAni,
    varstaLuni,
    gen,
    greutate,
    culoare,
    dataSalvarii,
    stareSanatate,
    sterilizat,
    disponibilAdoptie,
    descriere,
    imageUrl,
    addedBy,
  } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (
    !nume ||
    !specie ||
    !rasa ||
    !varstaAni ||
    !varstaLuni ||
    !gen ||
    !greutate ||
    !culoare ||
    !dataSalvarii ||
    !stareSanatate ||
    !sterilizat ||
    !disponibilAdoptie ||
    !descriere ||
    !imageUrl ||
    !addedBy
  ) {
    return res
      .status(400)
      .json({ message: "Toate câmpurile sunt obligatorii" });
  }

  try {
    connectDB();

    let pet = new Pet({
      nume,
      specie,
      rasa,
      varsta: { ani: varstaAni, luni: varstaLuni },
      gen,
      greutate,
      culoare,
      dataSalvarii,
      stareDeSanatate: stareSanatate,
      sterilizat,
      disponibil: disponibilAdoptie,
      descriere,
      addedBy,
      image: imageUrl,
    });

    await pet.save();

    return res.status(200).json({ message: "Animal adăugat cu succes" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
