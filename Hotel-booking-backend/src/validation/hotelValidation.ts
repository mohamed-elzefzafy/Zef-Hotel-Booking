import { check, param } from "express-validator";
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare";


export const hotelValidation = [
  check("name").notEmpty().withMessage( "Name is required"),
  check("city").notEmpty().withMessage( "city is required"),
  check("country").notEmpty().withMessage( "country is required"),
  check("description").notEmpty().withMessage( "description is required"),
  check("type").notEmpty().withMessage( "hotel type is required"),
  check("pricePerNight").notEmpty().isNumeric().withMessage( "pricePerNight is required and must be a number"),
  check("facilities").notEmpty().withMessage("facilities are required"),
  validatorMiddleWare
]

export const getOneHotelByIdValidation = [
  param("id").notEmpty().withMessage("Hotel Id Param is required"),validatorMiddleWare
]