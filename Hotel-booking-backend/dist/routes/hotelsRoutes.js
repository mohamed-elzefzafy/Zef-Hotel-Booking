"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelsControler_1 = require("../controllers/hotelsControler");
const hotelValidation_1 = require("../validation/hotelValidation");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.route("/getOneHotel/:id").get(hotelValidation_1.getOneHotelByIdValidation, hotelsControler_1.getOneHotelById);
router.route("/search").get(hotelsControler_1.getSearchHotel);
router.route("/:hotelId/booking/payment-intent").post(auth_1.verifyToken, hotelsControler_1.bookingPymentIntent);
router.route("/:hotelId/bookings").post(auth_1.verifyToken, hotelsControler_1.bookingHotel);
exports.default = router;
