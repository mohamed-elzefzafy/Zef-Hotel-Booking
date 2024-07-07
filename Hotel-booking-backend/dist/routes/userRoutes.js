"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControler_1 = require("../controllers/userControler");
const photoUploadMiddleWare_1 = __importDefault(require("../middlewares/photoUploadMiddleWare"));
const userValidation_1 = require("../validation/userValidation");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.route("/register").post(photoUploadMiddleWare_1.default.single("profilePhoto"), userValidation_1.registerValidation, userControler_1.register);
router.route("/login").post(userValidation_1.loginValidation, userControler_1.login);
router.route("/valid-token").get(auth_1.verifyToken, userControler_1.validToken);
router.route("/logout").post(userControler_1.logout);
router.route("/me").get(auth_1.verifyToken, userControler_1.getLoggedUserData);
// router.route("/logout").post(logout);
exports.default = router;
