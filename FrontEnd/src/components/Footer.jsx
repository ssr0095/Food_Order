import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div
      className="w-full bg-gray-900 pt-16 text-gray-400 lg:px-[10%] lg:pt-[5%]"
      id="contact"
    >
      <div className="mx-auto grid w-[85%] items-start gap-10 lg:w-full lg:grid-cols-4 lg:gap-20">
        <div className="flex flex-col items-start gap-6 lg:col-span-2">
          <img src={assets.logo1} className="w-[7rem]" />
          <p className="text-sm tracking-wide">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Praesentium iusto veniam dolorum voluptatibus exercitationem nisi,
            saepe tempora, pariatur temporibus aliquid.
          </p>
          <div className="flex items-center justify-center gap-3">
            <img src={assets.facebook_icon} className="w-8 lg:w-10" />
            <img src={assets.linkedin_icon} className="w-8 lg:w-10" />
            <img src={assets.twitter_icon} className="w-8 lg:w-10" />
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4">
          <h3 className="text-base font-semibold text-white md:text-lg">
            COMPANY
          </h3>
          <ul className="flex flex-col justify-start gap-2 text-sm">
            <li>
              <a href="/">Home</a>
            </li>
            <li>About</li>
            <li>Delivery</li>
            <li>Terms of service</li>
          </ul>
        </div>
        <div className="flex flex-col justify-start gap-4">
          <h3 className="text-base font-semibold text-white md:text-lg">
            GET IN TOUCH
          </h3>
          <ul className="flex flex-col justify-start gap-2 text-sm">
            <li>+91 45678-45211</li>
            <li>potato@help.com</li>
          </ul>
        </div>
      </div>
      <hr className="mx-auto mb-5 mt-7 h-[1px] w-4/5 border-none bg-gray-700 lg:mx-0" />
      <div className="pb-4">
        <p className="text-center text-xs md:text-sm lg:text-start">
          © Potato.com. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
