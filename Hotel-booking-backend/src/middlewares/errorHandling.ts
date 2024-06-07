import { NextFunction, Request, Response } from "express";


const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

interface CustomError extends Error {
  status?: number;
  stack?: string;
  name: string;
  kind?: string;
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  if (error.name === "CastError" && error.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      message,
      stack: error.stack
    });
  } else {
    res.status(statusCode).json({
      message,
    });
  }
}

export { notFound, errorHandler };