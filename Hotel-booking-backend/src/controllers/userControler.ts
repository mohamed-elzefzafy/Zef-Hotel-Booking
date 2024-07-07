import { NextFunction, Request, Response } from "express";
import UserModel from "../models/userModel";
import asyncHandler from "../middlewares/asyncHandler";
import jwt from "jsonwebtoken";
import { cloudinaryUploadImage } from "../utils/cloudinary";
import { formatImage } from "../middlewares/photoUploadMiddleWare";
import bcrypt from "bcryptjs";
import { UserType } from "../utils/types";
import customErrorClass from "../utils/customErrorClass";


 /**---------------------------------------
 * @desc    register user
 * @route   /api/v1/users/register
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const getLoggedUserData = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
const user = await UserModel.findById(req.userId).select("-password");
if (!user) {
  return next(customErrorClass.create(`this user not found` , 400))
}
res.status(200).json(user);
 }) ;


 /**---------------------------------------
 * @desc    register user
 * @route   /api/v1/users/register
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const register = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
let user  = await UserModel.findOne({email : req.body.email});
if (user) {
 return res.status(400).json({message: "User already exists"});
}
const newUser : UserType = req.body;
const profilePhoto = req.file as Express.Multer.File | undefined;


if (profilePhoto) {
  const file = formatImage(profilePhoto)

if (file) {
  const {secure_url , public_id} = await cloudinaryUploadImage(file);

  newUser.profilePhoto = {
    url : secure_url,
    public_id : public_id
}
  }


}

user = new UserModel(newUser);
await user.save();


const token = jwt.sign({userId : user._id} , process.env.JWT_SECRET as string , {expiresIn : "1d"});
res.cookie("token" , token , {
  httpOnly: true,
  secure : process.env.NODE_ENV === "production",
  maxAge : 86400000
})
return res.status(200).json({message : "user registered successfully"});
 });


  /**---------------------------------------
 * @desc    login user
 * @route   /api/v1/users/login
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const login = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
const {email , password} = req.body;
const user = await UserModel.findOne({email});
if (!user) {
  return res.status(400).json({message : "Invalid Credential"})
}

const isWritePassword = await bcrypt.compare(password , user.password);
if (!isWritePassword) {
  return res.status(400).json({message : "Invalid Credential"})
}
const token = jwt.sign({userId : user._id} , process.env.JWT_SECRET as string , {expiresIn : "1d"});

res.cookie("token" , token , {
  httpOnly : true,
  secure : process.env.NODE_ENV === "production",
  maxAge : 86400000
})

res.status(200).json({userId : user._id});
 });


   /**---------------------------------------
 * @desc    validToken
 * @route   /api/v1/users/valid-token
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const validToken = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
res.status(200).send({userId : req.userId})
 })


   /**---------------------------------------
 * @desc    validToken
 * @route   /api/v1/users/logout
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const logout = asyncHandler(async (req : Request , res : Response, next : NextFunction)   => {
res.cookie("token" , "" , {
  httpOnly : true,
  expires : new Date(0),

})
res.status(200).json({message : "logged out successfully"});
 })