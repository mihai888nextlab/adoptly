import mongoose, { Schema, Document } from "mongoose";

export interface Pet extends Document {
  nume: string;
  specie: string;
  rasa: string;
  varsta: { ani: number; luni: number };
  gen: string;
  greutate: number;
  culoare: string;
  dataSalvarii: string;
  stareDeSanatate: string;
  sterilizat: string;
  disponibil: string;
  descriere: string;
  addedBy: string;
  image: string;
}

const PetSchema = new Schema<Pet>({
  nume: { type: String, required: true },
  specie: { type: String, required: true },
  rasa: { type: String, required: true },
  varsta: { type: { ani: Number, luni: Number }, required: true },
  gen: { type: String, required: true },
  greutate: { type: Number, required: true },
  culoare: { type: String, required: true },
  dataSalvarii: { type: String, required: true },
  stareDeSanatate: { type: String, required: true },
  sterilizat: { type: String, required: true },
  disponibil: { type: String, required: true },
  descriere: { type: String, required: true },
  addedBy: { type: String, required: true },
  image: { type: String, required: true },
});

export const Pet =
  mongoose.models.adoptly_pets ||
  mongoose.model<Pet>("adoptly_pets", PetSchema);
