import express from "express";
import {  bookingHotel, bookingPymentIntent, getAllHotels, getOneHotelById, getSearchHotel } from "../controllers/hotelsControler";
import { getOneHotelByIdValidation } from "../validation/hotelValidation";
import { verifyToken } from "../middlewares/auth";
const router = express.Router();




router.route("/").get( getAllHotels);
router.route("/getOneHotel/:id").get(getOneHotelByIdValidation , getOneHotelById);
router.route("/search").get(getSearchHotel);
router.route("/:hotelId/booking/payment-intent").post(verifyToken , bookingPymentIntent);
router.route("/:hotelId/bookings").post(verifyToken , bookingHotel);


export default router;