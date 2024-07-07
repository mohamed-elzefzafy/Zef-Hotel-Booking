"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (error, req, res, next) => {
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
    }
    else {
        res.status(statusCode).json({
            message,
        });
    }
};
exports.errorHandler = errorHandler;
