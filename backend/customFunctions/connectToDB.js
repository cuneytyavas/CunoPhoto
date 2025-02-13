import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToDB;
