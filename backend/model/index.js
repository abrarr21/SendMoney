import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
      minLength: 4,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
      minLength: 4,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 25,
      minLength: 4,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
      minLength: 4,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("user", userSchema);
