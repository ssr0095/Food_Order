import orderModel from "../models/orderModel.js";

// import userModel from "../models/userModel.js";

const paymentComplete = async (req, res) => {
  const frontend_url = "https://food-order-frontend-nlzg.onrender.com";

  try {
    const session = {
      success_url: `${frontend_url}/verify?success=true&orderId=${req.body.orderId}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${req.body.orderId}`,
    };

    res.json({ success: true, session_url: session.success_url });
    // } else {
    //   res.json({ success: false, session_url: session.cancel_url });
    // }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verify = async (req, res) => {
  const { orderId, success } = req.body;
  // console.log(success, orderId);
  try {
    if (success == "true") {
      (await orderModel.findByIdAndUpdate(orderId, { payment: true })) &&
        // console.log("yes");
        res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { paymentComplete, verify };
