import { assets } from "../assets/assets";
import React from "react";

const NavBar = () => {
  return (
    <nav>
      <div className="flex h-[10%] w-full items-center justify-between border-b px-[4%] py-2">
        <img src={assets.logo} className="w-[max(10%,80px)]" />
        <img src={assets.profile_image} className="w-[max(3.5%,35px)]" />
      </div>
    </nav>
  );
};

export default NavBar;
