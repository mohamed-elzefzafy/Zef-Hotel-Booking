import express from "express";
import { getLoggedUserData, login, logout, register, validToken } from "../controllers/userControler";
import photoUpload from "../middlewares/photoUploadMiddleWare";
import { loginValidation, registerValidation } from "../validation/userValidation";
import { verifyToken } from "../middlewares/auth";
const router = express.Router();

router.route("/register").post( photoUpload.single("profilePhoto"), registerValidation , register);
router.route("/login").post(loginValidation , login);
router.route("/valid-token").get(verifyToken , validToken);
router.route("/logout").post(logout);
router.route("/me").get(verifyToken , getLoggedUserData);
// router.route("/logout").post(logout);


export default router;