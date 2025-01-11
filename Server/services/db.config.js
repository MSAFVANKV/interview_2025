import mongoose from "mongoose";

export const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDb connected successfully 👍");
      } catch (error) {
        console.error(error);
      }
}