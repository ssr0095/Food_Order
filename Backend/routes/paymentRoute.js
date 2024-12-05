import express from "express";
import { paymentComplete, verify } from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/process", authMiddleware, paymentComplete);
paymentRouter.post("/verify", verify);

export default paymentRouter;
