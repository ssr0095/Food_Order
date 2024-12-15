import express from "express";
import {
  register,
  login,
  sendVerifyOTP,
  verifyEmail,
  isAuthenticated,
  sendResetOTP,
  verifyResetOTP,
  resetPassword,
} from "../controllers/authController.js";
import authUser from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/sendOTP", authUser, sendVerifyOTP);
authRouter.post("/verifyAccount", authUser, verifyEmail);
authRouter.post("/sendResetOTP", sendResetOTP);
authRouter.post("/verifyResetOTP", verifyResetOTP);
authRouter.post("/resetPassword", resetPassword);
authRouter.post("/isAuth", authUser, isAuthenticated);

export default authRouter;
