import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="w-full my-20" id="mobile-app">
      <div className="flex flex-col items-center">
        <p className="text-2xl md:text-4xl md:leading-[3rem] text-center font-bold ">
          For Better Experience Download <br /> Potato App
        </p>
        <div className="flex items-center justify-center my-4 gap-7 md:gap-10">
          <img
            src={assets.app_store}
            className="w-28 md:w-36 active:scale-95 cursor-pointer duration-150"
          />
          <img
            src={assets.play_store}
            className="w-28 md:w-36 active:scale-95 cursor-pointer duration-150"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
