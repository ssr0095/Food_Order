import express from "express";
import {
  listOrders,
  OrderStatus,
  placeOrder,
  userOrders,
} from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userOrders", authMiddleware, userOrders);
orderRouter.post("/listOrders", listOrders);
orderRouter.post("/status", OrderStatus);

export default orderRouter;
