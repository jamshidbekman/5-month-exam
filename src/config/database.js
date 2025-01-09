import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    return mongoose.connect(MONGO_URL, {
      dbName: "library",
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
