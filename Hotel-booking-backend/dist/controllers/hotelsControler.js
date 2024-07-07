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
exports.bookingHotel = exports.bookingPymentIntent = exports.getSearchHotel = exports.getOneHotelById = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const hotel_Model_1 = __importDefault(require("../models/hotel.Model"));
const customErrorClass_1 = __importDefault(require("../utils/customErrorClass"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: process.env.DOTENV_CONFIG_PATH || path_1.default.resolve(__dirname, "../config.env") });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_API_KEY);
/**---------------------------------------
* @desc     addHotel
* @route   /api/v1/my-hotels
* @method  POST
* @access  public
----------------------------------------*/
exports.getOneHotelById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotel = yield hotel_Model_1.default.findById(req.params.id);
    if (!hotel) {
        return next(customErrorClass_1.default.create(`hotel with Id ${req.params.id} not found `, 400));
    }
    res.status(200).json(hotel);
}));
/**---------------------------------------
* @desc     addHotel
* @route   /api/v1/my-hotels
* @method  POST
* @access  public
----------------------------------------*/
exports.getSearchHotel = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = constructSearchQuery(req.query);
    let sortOptions = {};
    switch (req.query.sortOption) {
        case "starRating":
            sortOptions = { starRating: -1 };
            break;
        case "pricePerNightAsc":
            sortOptions = { pricePerNight: 1 };
            break;
        case "pricePerNightDesc":
            sortOptions = { pricePerNight: -1 };
            break;
    }
    const pageSize = 3;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1 ");
    const skip = (pageNumber - 1) * pageSize;
    const hotels = yield hotel_Model_1.default.find(query).sort(sortOptions).skip(skip).limit(pageSize);
    const total = yield hotel_Model_1.default.countDocuments(query);
    const response = {
        data: hotels,
        pagination: {
            total,
            page: pageNumber,
            pages: Math.ceil(total / pageSize)
        }
    };
    res.status(200).json(response);
}));
/**---------------------------------------
* @desc     bookin Pyment Intent
* @route   /api/v1/hotels/:hotelId/booking/payment-intent
* @method  POST
* @access  public
----------------------------------------*/
exports.bookingPymentIntent = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const hotel = yield hotel_Model_1.default.findById(hotelId);
    if (!hotel) {
        return next(customErrorClass_1.default.create(`hotel with Id ${hotelId} not found `, 400));
    }
    const totalCost = numberOfNights * hotel.pricePerNight;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: totalCost,
        currency: "USD",
        metadata: {
            hotelId,
            userId: req.userId,
        }
    });
    if (!paymentIntent.client_secret) {
        return res.status(500).json({ message: "error creating payment intent" });
    }
    const response = {
        paymentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost,
    };
    res.json(response);
}));
/**---------------------------------------
* @desc     addHotel
* @route   /api/v1/hotels/:hotelId/bookings
* @method  POST
* @access  public
----------------------------------------*/
exports.bookingHotel = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) {
        return res.status(500).json({ message: "payment intent not found" });
    }
    if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
        return res.status(500).json({ message: "payment intent do not match" });
    }
}));
const constructSearchQuery = (queryParams) => {
    let constructedQuery = {};
    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }
    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }
    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }
    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }
    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }
    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star) => parseInt(star))
            : parseInt(queryParams.stars);
        constructedQuery.starRating = { $in: starRatings };
    }
    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }
    return constructedQuery;
};
