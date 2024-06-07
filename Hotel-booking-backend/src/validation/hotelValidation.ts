import { check } from "express-validator";
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

// export const loginValidation = [
//   check("email" , "email is required").isEmail(),
//   check("password" , "password length at least 6 characters").isLength({min : 6}),
//   validatorMiddleWare
// ]