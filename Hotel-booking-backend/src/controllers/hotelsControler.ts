import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import HotelModel from "../models/hotel.Model";
import { BookingType, hotelSearchResponse } from "../utils/types";
import customErrorClass from "../utils/customErrorClass";
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname, "../config.env") });
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

 /**---------------------------------------
 * @desc     addHotel
 * @route   /api/v1/my-hotels
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getOneHotelById = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
const hotel = await HotelModel.findById(req.params.id);
if (!hotel) {
  return next(customErrorClass.create(`hotel with Id ${req.params.id} not found ` , 400))
}
res.status(200).json(hotel);
 });

 /**---------------------------------------
 * @desc     addHotel
 * @route   /api/v1/my-hotels
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getSearchHotel = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
  const query = constructSearchQuery(req.query);

  let sortOptions = {};
  switch(req.query.sortOption) {
    case "starRating":
      sortOptions = {starRating : -1}
      break;
      case "pricePerNightAsc": 
      sortOptions = {pricePerNight : 1}
      break; 
      case "pricePerNightDesc": 
      sortOptions = {pricePerNight : -1}
      break; 
  }
  const pageSize = 3;
const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1 ");
const skip = (pageNumber - 1)  * pageSize;  

  const hotels = await HotelModel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
  const total = await HotelModel.countDocuments(query);
const response : hotelSearchResponse = {
  data : hotels ,
   pagination :  {
      total , 
      page : pageNumber ,
       pages : Math.ceil(total / pageSize)
      }
    }

  res.status(200).json(response)
 })



 
 /**---------------------------------------
 * @desc     addHotel
 * @route   /api/v1/my-hotels
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getAllHotels = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
const hotels = await HotelModel.find().sort("-lastUpdated");
res.status(200).json(hotels);
 });



 /**---------------------------------------
 * @desc     bookin Pyment Intent
 * @route   /api/v1/hotels/:hotelId/booking/payment-intent
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const bookingPymentIntent = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => { 
const {numberOfNights} = req.body;
const hotelId = req.params.hotelId;

const hotel = await HotelModel.findById(hotelId);
if (!hotel) {
  return next(customErrorClass.create(`hotel with Id ${hotelId} not found ` , 400));
}
const totalCost = numberOfNights  * hotel.pricePerNight ;

const paymentIntent = await stripe.paymentIntents.create({
  amount : totalCost,
  currency : "USD",
  metadata : {
    hotelId,
    userId : req.userId,
  }
})

if (!paymentIntent.client_secret) {
  return res.status(500).json({message : "error creating payment intent"});
}


const response = {
  paymentId : paymentIntent.id,
  clientSecret : paymentIntent.client_secret.toString(),
  totalCost,
}

res.json(response);

 });




  /**---------------------------------------
 * @desc     addHotel
 * @route   /api/v1/hotels/:hotelId/bookings
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const bookingHotel = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
const paymentIntentId = req.body.paymentIntentId;

const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);

if (!paymentIntent) {
  return res.status(500).json({message : "payment intent not found"});
}
if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !==  req.userId) {
  return res.status(500).json({message : "payment intent do not match"});
} 

if (paymentIntent.status !== "succeeded") {
  return res.status(500).json({message : `payment intent not succeeded. Status: ${paymentIntent.status}`,});
}

const newBooking : BookingType = {
  ...req.body ,
   userId :req.userId,
}

const hotel = await HotelModel.findOneAndUpdate({_id : req.params.hotelId} ,{
  $push : {bookings : newBooking}
})

if (!hotel) {
  return res.status(500).json({message : "hotel not found"});
}

await hotel.save();
res.status(200).send();

 });



 const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

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
      ? queryParams.stars.map((star: string) => parseInt(star))
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
