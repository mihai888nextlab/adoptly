import mongoose, { Schema, Document } from "mongoose";

export interface Event extends Document {
  data: { an: number; luna: number; zi: number };
  ora_inceput: number;
  ora_sfarsit: number;
  locatie: string;
  ultima_zi: { an: number; luna: number; zi: number };
  image: string;
  shelter: string;
  addedBy: string;
}
const EventsSchema = new Schema<Event>({
  data: { type: { an: Number, luna: Number, zi: Number }, required: true },
  ora_inceput: { type: Number, required: true },
  ora_sfarsit: { type: Number, required: true },
  locatie: { type: String, required: true },
  ultima_zi: {
    type: { an: Number, luna: Number, zi: Number },
    required: true,
  },
  image: { type: String, required: true },
  addedBy: { type: String, required: true },
  shelter: { type: String, required: true },
});

export const Event =
  mongoose.models.adoptly_events ||
  mongoose.model<Event>("adoptly_events", EventsSchema);
