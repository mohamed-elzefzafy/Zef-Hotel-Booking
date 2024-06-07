import express from "express";
import { addHotel } from "../controllers/myHotelsControler";
import photoUpload from "../middlewares/photoUploadMiddleWare";
import { verifyToken } from "../middlewares/auth";
import { hotelValidation } from "../validation/hotelValidation";
const router = express.Router();


router.route("/").post(photoUpload.array("imageUrls" , 6) , verifyToken , hotelValidation , addHotel);


export default router;