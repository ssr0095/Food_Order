import React from "react";

const Header = () => {
  return (
    <div className="bg-hero bg-no-repeat bg-cover rounded-xl bg-center w-full h-[34vw] my-8 relative">
      <div className="w-1/2 absolute flex flex-col items-start gap-2 md:gap-5 bottom-[10%] left-[6.5%] animate-fadeIn">
        <h3 className="font-medium text-white text-[4.4vw] leading-snug lg:leading-tight">
          Order your favourite Food Here
        </h3>
        <p className="hidden lg:block text-white text-sm tracking-wide">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium
          iusto veniam dolorum voluptatibus exercitationem nisi, saepe tempora,
          pariatur temporibus aliquid, velit inventore amet quibusdam
          consectetur.
        </p>
        <a
          className="px-2 py-1 sm:px-4 sm:py-2 md:px-7 md:py-3 text-[9px] md:text-base shink-1 rounded-full text-gray-500 bg-white active:scale-95 cursor-pointer duration-150"
          href="#menu"
        >
          View Menu
        </a>
      </div>
    </div>
  );
};

export default Header;
