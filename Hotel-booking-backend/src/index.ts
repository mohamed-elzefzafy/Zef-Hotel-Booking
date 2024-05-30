import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDb";
import mountRoutes from './routes/mountRoutes';
dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname, "../config.env") });



const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin : process.env.FRONT_URL,
  credentials : true,
}));


connectDb();

app.use(express.static(path.join(__dirname, "../../Hotel-booking-frontend/dist")));

app.get("/" , async(req : Request, res : Response) => {
res.json("welcome to zef-hotel-booking api...");
});




mountRoutes(app);

app.listen(5000 , () => {
  console.log(`app running on port 5000`);
  
})