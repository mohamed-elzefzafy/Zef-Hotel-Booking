import { NextFunction, Request, Response } from "express";
import { cookie } from "express-validator";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Express } from 'express-serve-static-core';


declare global  {
namespace Express {
  interface Request {
    userId : string;
  }
}
}

export const verifyToken = (req : Request, res : Response, next : NextFunction) => {
const token = req.cookies["token"];
if (!token) {
  res.status(401).json({message : "unauthorized"});
}
  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET as string);
    req.userId = (decoded as JwtPayload).userId
    next();
    
  } catch (error) {
    res.status(401).json({message : "unauthorized"});
  }
}
