import express from "express";
import { register } from "../controllers/userControler";
import photoUpload from "../middlewares/photoUploadMiddleWare";
const router = express.Router();

// router.route("/register").post( photoUpload.single("profilePhoto") , register);
router.route("/register").post( photoUpload.single("profilePhoto") , register);
// router.route("/login").post( login);
// router.route("/logout").post(logout);


export default router;