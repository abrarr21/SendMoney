import mongoose from "mongoose";
import { MONGODB_URI } from "./constant.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB connection successful!!");
  } catch (error) {
    console.log("MongoDB connection failed!!!", error);
  }
};

export default connectDB;
