"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatImage = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const parser_js_1 = __importDefault(require("datauri/parser.js"));
const storage = multer_1.default.memoryStorage();
const parser = new parser_js_1.default();
const photoUpload = (0, multer_1.default)({ storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1MB
    },
});
const formatImage = (file) => {
    const fileExtension = path_1.default.extname(file.originalname).toString();
    return parser.format(fileExtension, file.buffer).content;
};
exports.formatImage = formatImage;
exports.default = photoUpload;
