"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.cloudinaryRemoveMultipleImage = exports.cloudinaryRemoveImage = exports.cloudinaryUploadImage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: process.env.DOTENV_CONFIG_PATH || path_1.default.resolve(__dirname, "../../config.env") });
const cloudinary = __importStar(require("cloudinary"));
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
// cloudinary upload image
const cloudinaryUploadImage = (fileUpload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield cloudinary.v2.uploader.upload(fileUpload, { resource_type: "auto", folder: "Zef-Hotel-Booking" });
        return data;
    }
    catch (error) {
        console.log(error);
        throw new Error("internal server error cloudinary");
    }
});
exports.cloudinaryUploadImage = cloudinaryUploadImage;
// cloudinary Remove image
const cloudinaryRemoveImage = (ImagePublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.v2.uploader.destroy(ImagePublicId);
        return result;
    }
    catch (error) {
        console.log(error);
        throw new Error("internal server error cloudinary");
    }
});
exports.cloudinaryRemoveImage = cloudinaryRemoveImage;
// cloudinary Remove multiple image
const cloudinaryRemoveMultipleImage = (publicIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.v2.api.delete_resources(publicIds);
        return result;
    }
    catch (error) {
        console.log(error);
        throw new Error("internal server error cloudinary");
    }
});
exports.cloudinaryRemoveMultipleImage = cloudinaryRemoveMultipleImage;
