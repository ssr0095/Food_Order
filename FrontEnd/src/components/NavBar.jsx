import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const NavBar = ({ setShowLogin }) => {
  // const NavActLink = ({ isActive }) => {
  //   return isActive
  //     ? "after:block after:relative after:bottom-0 after:w-full after:h-[5px] after:bg-tomato after:rounded-full"
  //     : "";
  // };
  const { getTotalAmt, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setToken("");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="D flex w-full items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo1} className="w-20 md:w-[7rem]" />
      </Link>
      <div className="hidden flex-col items-center justify-between gap-9 text-sm text-gray-900 lg:flex lg:flex-row xl:gap-12 xl:text-base">
        <Link to="/">Home</Link>
        <a href="#menu">Menu</a>
        <a href="#mobile-app">Mobile App</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="flex items-center justify-between gap-4 md:gap-6 lg:gap-8 xl:gap-12">
        <img src={assets.search_icon} className="w-4 cursor-pointer md:w-6" />
        <div className="relative">
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              className="w-4 cursor-pointer md:w-6"
            />
          </Link>
          <div
            className={
              getTotalAmt() === 0
                ? ""
                : "absolute right-[-5px] top-[-5px] size-2 rounded-full bg-tomato"
            }
          ></div>
        </div>
        {token ? (
          <div className="group relative cursor-default">
            <img
              src={assets.profile_icon}
              className="w-4 cursor-pointer md:w-5"
            />
            <div className="absolute -bottom-32 -right-2 z-30 hidden flex-col items-start rounded-lg bg-white p-1 shadow-lg shadow-[#00000047] group-hover:flex md:-bottom-[5.5rem]">
              <div
                className="flex w-[7rem] items-center gap-3 rounded-lg p-1 text-xs text-gray-500 shadow-sm hover:bg-gray-200 md:w-[8rem] md:p-3"
                onClick={() => {
                  navigate("/MyOrders");
                }}
              >
                <img src={assets.bag_icon} className="w-[0.65rem] md:w-4" />
                <p>My Orders</p>
              </div>
              <div
                className="flex w-[7rem] items-center gap-3 rounded-lg p-1 text-xs text-gray-500 shadow-sm hover:bg-gray-200 md:w-[8rem] md:p-3"
                onClick={logout}
              >
                <img src={assets.logout_icon} className="w-[0.65rem] md:w-4" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="rounded-full border-2 border-tomato px-2 py-1 text-xs text-gray-600 duration-150 active:scale-95 md:px-4 md:py-2 md:text-base"
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
