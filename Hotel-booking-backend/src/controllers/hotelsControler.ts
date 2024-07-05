import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import HotelModel from "../models/hotel.Model";
import { hotelSearchResponse } from "../utils/types";
import customErrorClass from "../utils/customErrorClass";



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
