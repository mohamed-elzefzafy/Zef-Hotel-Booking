import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import HotelModel from "../models/hotel.Model";
import { HotelType } from "../utils/types";


 /**---------------------------------------
 * @desc     get Logged User Bookings
 * @route   /api/v1/my-bookings
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getLoggedUserBookings = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
const hotels = await HotelModel.find({
  bookings : {$elemMatch : {userId : req.userId}}
})

const result = hotels.map(hotel => {
  const userBooking = hotel.bookings.filter(booking => booking.userId === req.userId);


  const hotelWithUserBooking : HotelType = {

    ...hotel.toObject(),
    bookings : userBooking
  } 
  return hotelWithUserBooking;
}
)

res.status(200).json(result);










// const hotels = await HotelModel.find({
//   bookings: { $elemMatch: { userId: req.userId } },
// });

// const results = hotels.map((hotel) => {
//   const userBookings = hotel.bookings.filter(
//     (booking) => booking.userId === req.userId
//   );

//   const hotelWithUserBookings: HotelType = {
//     ...hotel.toObject(),
//     bookings: userBookings,
//   };

//   return hotelWithUserBookings;
// });

// res.status(200).send(results);






 });