import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { url, token } = useContext(StoreContext);
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const res = await axios.post(
        url + "/api/payment/verify",
        {
          success,
          orderId,
        },
        {
          headers: { token },
        },
      );

      if (res.data.success) {
        navigate("/myOrders");
      } else {
        console.log("error: " + res);
        navigate("/");
        // alert(res.data);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div
      id="loading"
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white"
    >
      <div className="relative inline-flex">
        <div className="size-12 rounded-full bg-tomato"></div>
        <div className="absolute left-0 top-0 size-12 animate-ping rounded-full bg-tomato"></div>
        <div className="absolute left-0 top-0 size-12 animate-pulse rounded-full bg-tomato"></div>
      </div>
    </div>
  );
};

export default Verify;
