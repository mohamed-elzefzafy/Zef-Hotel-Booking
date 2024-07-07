"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.validToken = exports.login = exports.register = exports.getLoggedUserData = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("../utils/cloudinary");
const photoUploadMiddleWare_1 = require("../middlewares/photoUploadMiddleWare");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customErrorClass_1 = __importDefault(require("../utils/customErrorClass"));
/**---------------------------------------
* @desc    register user
* @route   /api/v1/users/register
* @method  POST
* @access  public
----------------------------------------*/
exports.getLoggedUserData = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.userId).select("-password");
    if (!user) {
        return next(customErrorClass_1.default.create(`this user not found`, 400));
    }
    res.status(200).json(user);
}));
/**---------------------------------------
* @desc    register user
* @route   /api/v1/users/register
* @method  POST
* @access  public
----------------------------------------*/
exports.register = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = req.body;
    const profilePhoto = req.file;
    if (profilePhoto) {
        const file = (0, photoUploadMiddleWare_1.formatImage)(profilePhoto);
        if (file) {
            const { secure_url, public_id } = yield (0, cloudinary_1.cloudinaryUploadImage)(file);
            newUser.profilePhoto = {
                url: secure_url,
                public_id: public_id
            };
        }
    }
    user = new userModel_1.default(newUser);
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000
    });
    return res.status(200).json({ message: "user registered successfully" });
}));
/**---------------------------------------
* @desc    login user
* @route   /api/v1/users/login
* @method  POST
* @access  public
----------------------------------------*/
exports.login = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid Credential" });
    }
    const isWritePassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!isWritePassword) {
        return res.status(400).json({ message: "Invalid Credential" });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000
    });
    res.status(200).json({ userId: user._id });
}));
/**---------------------------------------
* @desc    validToken
* @route   /api/v1/users/valid-token
* @method  GET
* @access  public
----------------------------------------*/
exports.validToken = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ userId: req.userId });
}));
/**---------------------------------------
* @desc    validToken
* @route   /api/v1/users/logout
* @method  POST
* @access  public
----------------------------------------*/
exports.logout = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "logged out successfully" });
}));
