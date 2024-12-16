import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loadingPAGE, setLoadingPAGE] = useState(false);

  const fetchData = async () => {
    setLoadingPAGE(true);

    try {
      const res = await axios.post(
        url + "/api/order/userOrders",
        {},
        { headers: { token } },
      );
      setOrders(res.data.data);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setLoadingPAGE(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>
            <div className="mt-6 flex flex-col items-center gap-5 sm:mt-8 lg:gap-5">
              {orders.map((order, index) => {
                return (
                  <div
                    key={index}
                    className="grid w-full grid-cols-1 items-center gap-4 border border-gray-500 p-5 text-xs text-gray-600 lg:grid-cols-order"
                  >
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
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p>
                      <span>{order.status == "Delivered" ? "🟢" : "🟡"}</span>
                      {" " + order.status}
                    </p>
                    <button
                      onClick={fetchData}
                      className="cursor-pointer rounded-full bg-tomato px-2 py-1 text-white duration-150 active:scale-95 sm:px-4 sm:py-2 md:px-5 md:py-3"
                    >
                      Track Order
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {loadingPAGE && (
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
      )}
    </>
  );
};

export default MyOrders;
