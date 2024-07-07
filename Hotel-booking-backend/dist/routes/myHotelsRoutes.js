"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const myHotelsControler_1 = require("../controllers/myHotelsControler");
const photoUploadMiddleWare_1 = __importDefault(require("../middlewares/photoUploadMiddleWare"));
const auth_1 = require("../middlewares/auth");
const hotelValidation_1 = require("../validation/hotelValidation");
const router = express_1.default.Router();
router.route("/").post(photoUploadMiddleWare_1.default.array("imageUrls", 6), auth_1.verifyToken, hotelValidation_1.hotelValidation, myHotelsControler_1.addHotel);
router.route("/").get(auth_1.verifyToken, myHotelsControler_1.getAllHotels);
router.route("/:id").get(auth_1.verifyToken, myHotelsControler_1.getOneHotel);
router.route("/update-hotel/:id").put(photoUploadMiddleWare_1.default.array("imageUrls", 6), auth_1.verifyToken, myHotelsControler_1.updateHotel);
exports.default = router;
