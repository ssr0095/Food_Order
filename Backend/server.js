import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connDB from "./config/DB.js";
import foodRouter from "./routes/foodRoute.js";
import authRouter from "./routes/authRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

// app config
const app = express();
const port = process.env.PORT || 7000;

// DB connection
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
connDB();

// middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("Fucck");
});
