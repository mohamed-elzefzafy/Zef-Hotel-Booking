"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleWare_1 = require("../middlewares/validatorMiddleWare");
exports.registerValidation = [
    (0, express_validator_1.check)("firstName", "first Name is required").isString(),
    (0, express_validator_1.check)("lastName", "last Name is required").isString(),
    (0, express_validator_1.check)("email", "email is required").isEmail(),
    (0, express_validator_1.check)("password", "password length at least 6 characters").isLength({ min: 6 }),
    validatorMiddleWare_1.validatorMiddleWare
];
exports.loginValidation = [
    (0, express_validator_1.check)("email", "email is required").isEmail(),
    (0, express_validator_1.check)("password", "password length at least 6 characters").isLength({ min: 6 }),
    validatorMiddleWare_1.validatorMiddleWare
];
