import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";

const Orders = ({ url }) => {
  const [orderList, setOrderList] = useState([]);

  const fetchData = async () => {
    const res = await axios.post(url + "/api/order/listOrders", {});
    // console.log(res);
    if (res.data.success) {
      setOrderList(res.data.data);
    } else {
      toast.error("Error");
    }
    // console.log(res.data.data);
  };

  const statusHandler = async (e, orderId) => {
    // console.log(e.target.value, orderId);
    try {
      const res = await axios.post(url + "/api/order/status", {
        status: e.target.value,
        orderId,
      });
      // console.log(res.data);
      if (res.data.success) {
        await fetchData();
        toast.success("Updated");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="no-scrollbar mb-20 flex h-full w-full overflow-scroll bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="no-scrollbar mx-auto h-svh w-4/5 overflow-scroll px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            My orders
          </h2>
          <div className="mt-6 flex flex-col items-center gap-5 text-xs text-gray-600 dark:text-white sm:mt-8 lg:gap-5">
            {orderList.map((order, index) => {
              return (
                <div key={index} className="w-full border border-gray-300 p-5">
                  <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-order">
                    <img src={assets.parcel_icon} />
                    <p className="w-10/12">
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " x " + item.quantity;
                        } else {
                          return item.name + " x " + item.quantity + ", ";
                        }
                      })}
                    </p>
                    <p>Items: {order.items.length}</p>
                    <p>${order.amount}</p>

                    <select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="input text-gray-400"
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out of Delivery">Out of Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <hr className="my-5 h-[1px] w-full border-none bg-gray-200" />
                  <div>
                    <p className="font-bold">
                      {order.address.firstName + " " + order.address.lastName}
                    </p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.zipcode}
                    </p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
