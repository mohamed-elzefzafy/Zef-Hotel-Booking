import { check } from "express-validator";
import { validatorMiddleWare } from "../middlewares/validatorMiddleWare";


export const registerValidation = [
  check("firstName" , "first Name is required").isString(),
  check("lastName" , "last Name is required").isString(),
  check("email" , "email is required").isEmail(),
  check("password" , "password length at least 6 characters").isLength({min : 6}),
  validatorMiddleWare
]

export const loginValidation = [
  check("email" , "email is required").isEmail(),
  check("password" , "password length at least 6 characters").isLength({min : 6}),
  validatorMiddleWare
]