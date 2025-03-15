import { connectDB } from "@/lib/connectDB";
import { Event } from "@/lib/models/events";
import { NextApiRequest, NextApiResponse } from "next";
import { projectGetSourceMap } from "next/dist/build/swc/generated-native";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    data_an,
    data_luna,
    data_zi,
    ora_inceput,
    ora_sfarsit,
    locatie,
    ultima_zi_an,
    ultima_zi_luna,
    ultima_zi,
    link_program,
    imageUrl,
    shelter,
  } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (
    !data_an ||
    !data_luna ||
    !data_zi ||
    !ora_inceput ||
    !ora_sfarsit ||
    !locatie ||
    !ultima_zi_an ||
    !ultima_zi_luna ||
    !ultima_zi ||
    !link_program ||
    !imageUrl ||
    !shelter
  ) {
    return res
      .status(400)
      .json({ message: "Toate câmpurile sunt obligatorii" });
  }

  try {
    connectDB();

    let event = new Event({
      data: { an: data_an, luna: data_luna, zi: data_zi },
      ora_inceput,
      ora_sfarsit,
      locatie,
      ultima_zi: { an: ultima_zi_an, luna: ultima_zi_luna, zi: ultima_zi },
      link_program,
      shelter,
      image: imageUrl,
    });

    return res.status(200).json({ message: "Eveniment adăugat cu succes" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
