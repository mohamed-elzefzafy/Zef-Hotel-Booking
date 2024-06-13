import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { Express } from 'express-serve-static-core';
import { formatImage } from "../middlewares/photoUploadMiddleWare";
import { cloudinaryUploadImage } from "../utils/cloudinary";
import { CloudinaryObject, HotelType } from "../utils/types";
import HotelModel from "../models/hotel.Model";
import customErrorClass from "../utils/customErrorClass";


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

// let resultsArrayOfObjects : CloudinaryObject[] = [];
//  results.map(oneResult => {
// resultsArrayOfObjects.push( {
//   url :  oneResult.url,
//   public_id : oneResult.public_id
// })
// })

let resultsArrayOfObjects : string[] = [];
 results.map(oneResult => {
resultsArrayOfObjects.push( oneResult.url)
})



newHotel.imageUrls = resultsArrayOfObjects
newHotel.lastUpdated = new Date();
newHotel.userId = req.userId;

const hotel = new HotelModel(newHotel);

await hotel.save();
res.status(201).json(hotel);

 });


  /**---------------------------------------
 * @desc     get All Hotels
 * @route   /api/v1/my-hotels
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getAllHotels = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
const hotels = await HotelModel.find({userId : req.userId});
res.status(200).json(hotels);
 });


   /**---------------------------------------
 * @desc     get One Hotel
 * @route   /api/v1/my-hotels/:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getOneHotel = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
  const hotel = await HotelModel.findOne({_id : req.params.id.toString() , userId : req.userId});

  if (!hotel) {
    return next(customErrorClass.create(`hotel with Id ${req.params.id} not found ` , 400))
  }
  
  res.status(200).json(hotel);
   });


      /**---------------------------------------
 * @desc     update Hotel
 * @route   /api/v1/my-hotels/update-hotel/:id
 * @method  PUT
 * @access  public 
 ----------------------------------------*/
 export const updateHotel = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
  const hotel = await HotelModel.findOne({_id : req.params.id.toString() , userId : req.userId});

  if (!hotel) {
    return next(customErrorClass.create(`hotel with Id ${req.params.id} not found ` , 400))
  }


  const updatedHotel : HotelType = req.body;
  const imageUrls = req.files as Express.Multer.File[];

  updatedHotel.lastUpdated = new Date();

  const files  = imageUrls.map(file => formatImage(file));

  let results = [];
  for (let file of files) {
    const result =  await cloudinaryUploadImage(file as string);
  results.push(result);
  }

  let resultsArrayOfObjects : string[] = [];
   results.map(oneResult => {
  resultsArrayOfObjects.push( oneResult.url)
  })
  
  
  
updatedHotel.imageUrls = resultsArrayOfObjects


  const newHotel = await HotelModel.findOneAndUpdate({_id : req.params.id.toString() , userId : req.userId}
   , updatedHotel , {new : true})


  
  res.status(201).json(newHotel);
   });