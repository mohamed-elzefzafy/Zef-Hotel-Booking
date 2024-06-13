import express from "express";
import { addHotel, getAllHotels, getOneHotel, updateHotel } from "../controllers/myHotelsControler";
import photoUpload from "../middlewares/photoUploadMiddleWare";
import { verifyToken } from "../middlewares/auth";
import { hotelValidation } from "../validation/hotelValidation";
const router = express.Router();


router.route("/").post(photoUpload.array("imageUrls" , 6) , verifyToken , hotelValidation , addHotel);
router.route("/").get(verifyToken , getAllHotels);
router.route("/:id").get(verifyToken , getOneHotel);
router.route("/update-hotel/:id").put(photoUpload.array("imageUrls" , 6) , verifyToken , updateHotel);


export default router;