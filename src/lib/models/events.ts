import mongoose, { Schema, Document } from "mongoose";

export interface Event extends Document {
  date: { an: number; luna: number; zi: number };
  hour_begin: number;
  hour_end: number;
  location: string;
  last_enter: { an: number; luna: number; zi: number };
  link: string;
  image: string;
  shelter: string;
  addedBy: string;
}
const EventsSchema = new Schema<Event>({
  date: { type: { an: Number, luna: Number, zi: Number }, required: true },
  hour_begin: { type: Number, required: true },
  hour_end: { type: Number, required: true },
  location: { type: String, required: true },
  last_enter: {
    type: { an: Number, luna: Number, zi: Number },
    required: true,
  },
  link: { type: String, required: true },
  image: { type: String, required: true },
  addedBy: { type: String, required: true },
  shelter: { type: String, required: true },
});

export const Event =
  mongoose.models.adoptly_events ||
  mongoose.model<Event>("adoptly_events", EventsSchema);
