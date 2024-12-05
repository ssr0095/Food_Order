import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodCard = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-100">
      <div className="relative">
        <img src={url + "/images/" + image} className="w-full rounded-t-xl" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
            className="absolute bottom-3 right-3 w-10 cursor-pointer rounded-full duration-150 active:scale-95"
          />
        ) : (
          <div className="absolute bottom-3 right-3 flex w-32 shrink-0 cursor-pointer items-center justify-between gap-2 rounded-full bg-white p-1">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              className="w-10 duration-150 active:scale-95"
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              className="w-10 duration-150 active:scale-95"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <img src={assets.rating_starts} className="w-16" />
        </div>
        <p className="line-clamp-2 text-sm tracking-wide text-slate-600">
          {description}
        </p>
        <p className="text-lg font-semibold text-tomato md:text-xl">${price}</p>
      </div>
    </div>
  );
};

export default FoodCard;
