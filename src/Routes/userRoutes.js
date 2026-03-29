import express from "express";
import {  OtpVerification,
    passwordReset,
    profileDetails,
    RecoverVerifyEmail,
    userLogin,
    userProfileDelete,
    userProfileUpdate,
    userRegister } from "../controllers/UserController.js";
import  authMiddleware  from "../Middleware/authMiddlewere.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.put("/profile/update", authMiddleware, userProfileUpdate);
router.delete("/profile/delete", authMiddleware, userProfileDelete);
router.get("/profile/profiledetails",authMiddleware, profileDetails);
router.get("/profile/RecoverVerifyEmail/:email", RecoverVerifyEmail);
router.get("/profile/OtpVerification/:email/:otp", OtpVerification);
router.post("/profile/passwordReset", passwordReset);

export default router;