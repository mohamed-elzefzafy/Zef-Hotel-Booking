import express from "express";
import { getOneHotelById, getSearchHotel } from "../controllers/hotelsControler";
import { getOneHotelByIdValidation } from "../validation/hotelValidation";
const router = express.Router();




router.route("/getOneHotel/:id").get(getOneHotelByIdValidation , getOneHotelById);
router.route("/search").get(getSearchHotel);


export default router;