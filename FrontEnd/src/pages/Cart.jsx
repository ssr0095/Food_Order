import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalAmt, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  let TAX = Math.round(getTotalAmt() * (2 / 10));
  return (
    <div className="no-scrollbar flex h-full w-full flex-col items-start justify-center overflow-scroll pb-20 pt-12 md:items-center">
      <div className="no-scrollbar h-fit max-h-svh min-w-[560px] overflow-scroll rounded-lg bg-white md:w-full">
        <div className="sticky right-0 top-0 grid grid-cols-cart items-center border-0 border-b-2 bg-white py-3 text-sm font-semibold text-gray-900 lg:text-xl">
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Tot</p>
          <p>Edit</p>
        </div>

        {foodList.map((item, index) => {
          return (
            cartItems[item._id] > 0 && (
              <div key={index}>
                <div className="my-3 grid grid-cols-cart items-center text-xs text-gray-900 lg:text-base">
                  <img
                    src={url + "/images/" + item.image}
                    className="size-8 rounded-full md:size-10"
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${cartItems[item._id] * item.price}</p>
                  <img
                    src={assets.remove_icon_red}
                    onClick={() => removeFromCart(item._id)}
                    className="size-8 cursor-pointer"
                  />
                </div>
                <hr />
              </div>
            )
          );
        })}
      </div>
      <div className="my-20 flex w-full flex-col-reverse items-start justify-between gap-14 lg:flex-row">
        <div className="flex w-full flex-col gap-5 lg:w-2/5">
          <h2 className="text-xl font-semibold text-gray-900">Cart Total</h2>
          <div>
            <div className="my-3 flex items-center justify-between text-base text-gray-900">
              <p>Subtotal</p>
              <p>${getTotalAmt()}</p>
            </div>
            <hr />
            <div className="my-3 flex items-center justify-between text-base text-gray-900">
              <p>Delivary fee</p>
              <p>${getTotalAmt() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="my-3 flex items-center justify-between text-base text-gray-900">
              <p>
                Tax <span className="text-xs text-gray-400">(18%)</span>
              </p>
              <p>${getTotalAmt() === 0 ? 0 : TAX}</p>
            </div>
            <hr />
            <div className="my-3 flex items-center justify-between text-xl font-semibold text-gray-900">
              <p>Total</p>
              <p>${getTotalAmt() === 0 ? 0 : getTotalAmt() + TAX + 5}</p>
            </div>
            <hr />
          </div>
          <button
            className="mt-4 w-full cursor-pointer rounded-lg border-2 bg-tomato px-4 py-2 text-lg text-white hover:bg-tomato-hov active:border-[#a7a7a7] active:bg-[#ff3a24] lg:w-2/3"
            onClick={() => navigate("/order")}
          >
            Proceed to checkout
          </button>
        </div>
        <div className="w-full space-y-4 lg:w-2/5">
          <h3 className="text-xl font-semibold text-gray-900">
            Enter Promo Code
          </h3>
          <div className="flex w-full items-center gap-3">
            <input type="text" placeholder="Enter" className="input" />
            <button className="w-2/6 rounded-lg border-2 bg-gray-950 p-2.5 text-white shadow-sm outline-none duration-75 hover:bg-gray-800 active:border-2 active:border-gray-400 active:bg-gray-900">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
