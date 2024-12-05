import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const SideBar = () => {
  const Active = ({ isActive }) => {
    return isActive
      ? "w-full px-2 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 bg-white border-2 border-dashed border-tomato-light md:border-e-0  rounded-lg md:rounded-e-none cursor-default"
      : "w-full px-2 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 bg-white border md:border-e-0 rounded-lg md:rounded-e-none cursor-default";
  };

  return (
    <div className="flex h-full w-full shrink-0 items-center bg-gray-100 md:h-svh md:w-[20vw] md:items-start md:justify-end md:border md:border-y-0 md:bg-white">
      <div className="flex h-fit w-full items-center gap-5 p-6 md:w-4/5 md:flex-col md:p-0 md:pt-10">
        <NavLink to="/add" className={Active}>
          <img src={assets.add_icon} className="w-3 md:w-5" />
          <p className="text-xs text-gray-500 md:text-sm">Add items</p>
        </NavLink>
        <NavLink to="/list" className={Active}>
          <img src={assets.order_icon} className="w-3 md:w-5" />
          <p className="text-xs text-gray-500 md:text-sm">List items</p>
        </NavLink>
        <NavLink to="/orders" className={Active}>
          <img src={assets.order_icon} className="w-3 md:w-5" />
          <p className="text-xs text-gray-500 md:text-sm">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
