import mongoose from "mongoose"
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname, "../config.env") });

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string) ;
    console.log("Connected to MongoDB successfully");
    
  } catch (error) {
    console.log("connection failed to MongoDB : " , error);
    process.exit(1);
  }
}


export default connectDb;