import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { Express } from 'express-serve-static-core';
import { formatImage } from "../middlewares/photoUploadMiddleWare";
import { cloudinaryUploadImage } from "../utils/cloudinary";
import { CloudinaryObject, HotelType } from "../utils/types";
import HotelModel from "../models/hotel.Model";


// export type CloudinaryObject = {
//     url :  string,
//     public_id : string
// }

 /**---------------------------------------
 * @desc     addHotel
 * @route   /api/v1/my-hotels
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const addHotel = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {

  const imageUrls = req.files as Express.Multer.File[];
  const newHotel : HotelType = req.body;

  
const files  = imageUrls.map(file => formatImage(file));

let results = [];
for (let file of files) {
  const result =  await cloudinaryUploadImage(file as string);
results.push(result);
}

let resultsArrayOfObjects : CloudinaryObject[] = [];
 results.map(oneResult => {
resultsArrayOfObjects.push( {
  url :  oneResult.url,
  public_id : oneResult.public_id
})
})


newHotel.imageUrls = resultsArrayOfObjects
newHotel.lastUpdated = new Date();
newHotel.userId = req.userId;

const hotel = new HotelModel(newHotel);

await hotel.save();
res.status(201).json(hotel);

 });