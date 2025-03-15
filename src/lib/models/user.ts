import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  role: string;
  activated: boolean;
  email: string;
  password: string;
  name: string;
}

const UserSchema = new Schema<User>({
  role: { type: String, required: true },
  activated: { type: Boolean, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

export const User =
  mongoose.models.adoptly_users ||
  mongoose.model<User>("adoptly_users", UserSchema);
