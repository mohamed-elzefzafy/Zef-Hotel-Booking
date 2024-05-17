import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDb from "./config/connectDb";
import mountRoutes from './routes/mountRoutes';
dotenv.config({ path: path.resolve(__dirname, "../config.env") });


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


connectDb();

app.get("/" , async(req : Request, res : Response) => {
res.json("welcome to zef-hotel-booking api...");
});




mountRoutes(app);

app.listen(5000 , () => {
  console.log(`app running on port 5000`);
  
})