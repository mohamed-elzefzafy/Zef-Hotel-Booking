"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./userRoutes"));
const myHotelsRoutes_1 = __importDefault(require("./myHotelsRoutes"));
const hotelsRoutes_1 = __importDefault(require("./hotelsRoutes"));
const mountRoutes = (app) => {
    app.use("/api/v1/users", userRoutes_1.default);
    app.use("/api/v1/my-hotels", myHotelsRoutes_1.default);
    app.use("/api/v1/hotels", hotelsRoutes_1.default);
};
exports.default = mountRoutes;
