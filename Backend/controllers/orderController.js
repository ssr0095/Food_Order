import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  // const frontend_url = "http://localhost:3000";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    // const session = {
    //   success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    //   cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    // };

    res.json({ success: true, message: "Order placed", orderId: newOrder._id });
    // } else {
    //   res.json({ success: false, session_url: session.cancel_url });
    // }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orderList = await orderModel.find({});
    res.json({ success: true, data: orderList });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const OrderStatus = async (req, res) => {
  // console.log(req);
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders, listOrders, OrderStatus };
