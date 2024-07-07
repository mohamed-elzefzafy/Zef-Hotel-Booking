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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const mountRoutes_1 = __importDefault(require("./routes/mountRoutes"));
const errorHandling_1 = require("./middlewares/errorHandling");
dotenv_1.default.config({ path: process.env.DOTENV_CONFIG_PATH || path_1.default.resolve(__dirname, "../config.env") });
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONT_URL,
    credentials: true,
}));
(0, connectDb_1.default)();
// app.use(express.static(path.join(__dirname, "../../Hotel-booking-frontend/dist")));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("welcome to zef-hotel-booking api...");
}));
(0, mountRoutes_1.default)(app);
app.use(errorHandling_1.notFound);
app.use(errorHandling_1.errorHandler);
app.listen(5000, () => {
    console.log(`app running on port 5000`);
});
