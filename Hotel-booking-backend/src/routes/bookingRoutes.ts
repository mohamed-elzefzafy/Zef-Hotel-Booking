import express from "express";
import { getLoggedUserBookings } from "../controllers/bookingController";
import { verifyToken } from "../middlewares/auth";
const router = express.Router();




router.route("/").get(verifyToken , getLoggedUserBookings);



export default router;