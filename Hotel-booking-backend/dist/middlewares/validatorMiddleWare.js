"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMiddleWare = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleWare = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validatorMiddleWare = validatorMiddleWare;
