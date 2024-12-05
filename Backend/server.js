import express from "express";
import cors from "cors";
import connDB from "./config/DB.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// DB connection
connDB();

// middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/food/", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user/", userRouter);
app.use("/api/cart/", cartRouter);
app.use("/api/order/", orderRouter);
app.use("/api/payment/", paymentRouter);

app.get("/", (req, res) => {
  res.send("Fucck");
});
