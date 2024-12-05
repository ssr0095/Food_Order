import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    <div className="flex h-screen w-full items-center justify-center">
      <span className="h-20 w-20 animate-spin rounded-full border-t-4 border-tomato"></span>
    </div>
  );
};

export default Verify;
