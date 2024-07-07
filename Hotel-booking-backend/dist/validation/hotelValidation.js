"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneHotelByIdValidation = exports.hotelValidation = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleWare_1 = require("../middlewares/validatorMiddleWare");
exports.hotelValidation = [
    (0, express_validator_1.check)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.check)("city").notEmpty().withMessage("city is required"),
    (0, express_validator_1.check)("country").notEmpty().withMessage("country is required"),
    (0, express_validator_1.check)("description").notEmpty().withMessage("description is required"),
    (0, express_validator_1.check)("type").notEmpty().withMessage("hotel type is required"),
    (0, express_validator_1.check)("pricePerNight").notEmpty().isNumeric().withMessage("pricePerNight is required and must be a number"),
    (0, express_validator_1.check)("facilities").notEmpty().withMessage("facilities are required"),
    validatorMiddleWare_1.validatorMiddleWare
];
exports.getOneHotelByIdValidation = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Hotel Id Param is required"), validatorMiddleWare_1.validatorMiddleWare
];
