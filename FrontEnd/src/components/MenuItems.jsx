import React from "react";
import { menu_list } from "../assets/assets";

const MenuItems = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col items-start gap-4" id="menu">
      <h1 className="text-2xl md:text-3xl text-gray-900 font-semibold">
        Explore menu
      </h1>
      <p className="w-full md:w-3/4 lg:w-3/5 text-xs md:text-base tracking-wide">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium
        iusto veniam dolorum voluptatibus exercitationem nisi, saepe tempora.
      </p>
      <div className="w-full flex items-center justify-between gap-10 mt-4 mx-auto overflow-scroll no-scrollbar">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer space-x-3  shrink-0"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                className={
                  (category === item.menu_name &&
                    "border-4 border-tomato p-1 w-[7.5vw] min-w-20 duration-300 cursor-pointer rounded-full") +
                  ` w-[7.5vw] min-w-20 duration-200 cursor-pointer rounded-full`
                }
              />
              <p className="text-sm md:text-base text-gray-700 cursor-pointer mt-4">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="my-4 mx-auto bg-gray-200 h-[2px] w-full border-none" />
    </div>
  );
};

export default MenuItems;
