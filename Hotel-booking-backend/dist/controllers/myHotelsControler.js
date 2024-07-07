"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHotel = exports.getOneHotel = exports.getAllHotels = exports.addHotel = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const photoUploadMiddleWare_1 = require("../middlewares/photoUploadMiddleWare");
const cloudinary_1 = require("../utils/cloudinary");
const hotel_Model_1 = __importDefault(require("../models/hotel.Model"));
const customErrorClass_1 = __importDefault(require("../utils/customErrorClass"));
/**---------------------------------------
* @desc     addHotel
* @route   /api/v1/my-hotels
* @method  POST
* @access  public
----------------------------------------*/
exports.addHotel = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrls = req.files;
    const newHotel = req.body;
    const files = imageUrls.map(file => (0, photoUploadMiddleWare_1.formatImage)(file));
    let results = [];
    for (let file of files) {
        const result = yield (0, cloudinary_1.cloudinaryUploadImage)(file);
        results.push(result);
    }
    // let resultsArrayOfObjects : CloudinaryObject[] = [];
    //  results.map(oneResult => {
    // resultsArrayOfObjects.push( {
    //   url :  oneResult.url,
    //   public_id : oneResult.public_id
    // })
    // })
    let resultsArrayOfObjects = [];
    results.map(oneResult => {
        resultsArrayOfObjects.push(oneResult.url);
    });
    newHotel.imageUrls = resultsArrayOfObjects;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;
    const hotel = new hotel_Model_1.default(newHotel);
    yield hotel.save();
    res.status(201).json(hotel);
}));
/**---------------------------------------
* @desc     get All Hotels
* @route   /api/v1/my-hotels
* @method  GET
* @access  public
----------------------------------------*/
exports.getAllHotels = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotels = yield hotel_Model_1.default.find({ userId: req.userId });
    res.status(200).json(hotels);
}));
/**---------------------------------------
* @desc     get One Hotel
* @route   /api/v1/my-hotels/:id
* @method  GET
* @access  public
----------------------------------------*/
exports.getOneHotel = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = yield hotel_Model_1.default.findOne({ _id: req.params.id.toString(), userId: req.userId });
    if (!hotel) {
        return next(customErrorClass_1.default.create(`hotel with Id ${req.params.id} not found `, 400));
    }
    res.status(200).json(hotel);
}));
/**---------------------------------------
* @desc     update Hotel
* @route   /api/v1/my-hotels/update-hotel/:id
* @method  PUT
* @access  public
----------------------------------------*/
exports.updateHotel = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = yield hotel_Model_1.default.findOne({ _id: req.params.id.toString(), userId: req.userId });
    if (!hotel) {
        return next(customErrorClass_1.default.create(`hotel with Id ${req.params.id} not found `, 400));
    }
    const updatedHotel = req.body;
    const imageUrls = req.files;
    updatedHotel.lastUpdated = new Date();
    const files = imageUrls.map(file => (0, photoUploadMiddleWare_1.formatImage)(file));
    let results = [];
    for (let file of files) {
        const result = yield (0, cloudinary_1.cloudinaryUploadImage)(file);
        results.push(result);
    }
    let resultsArrayOfObjects = [];
    results.map(oneResult => {
        resultsArrayOfObjects.push(oneResult.url);
    });
    updatedHotel.imageUrls = resultsArrayOfObjects;
    const newHotel = yield hotel_Model_1.default.findOneAndUpdate({ _id: req.params.id.toString(), userId: req.userId }, updatedHotel, { new: true });
    res.status(201).json(newHotel);
}));
