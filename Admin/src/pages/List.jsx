import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const res = await axios.post(url + "/api/food/list", {});
      if (res.data.success) {
        setList(res.data.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error");
      console.log("Error: " + error);
    }
  };
  const removeFood = async (foodId) => {
    try {
      const res = await axios.post(`${url}/api/food/delete`, { id: foodId });
      if (res.data.success) {
        await fetchList();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error");
      console.log("Error: " + error);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="no-scrollbar flex h-full w-full items-start justify-start overflow-scroll bg-gray-100 px-10 pb-20 pt-12 md:justify-center">
      <div className="no-scrollbar h-svh min-w-[560px] overflow-scroll rounded-lg bg-white px-5 md:min-w-[80%]">
        <div className="sticky right-0 top-0 grid grid-cols-cart items-center border-0 border-b-2 bg-white py-3 text-sm font-semibold text-gray-500 lg:text-xl">
          <p>Item</p>
          <p>Name</p>
          <p>Description</p>
          <p>Price</p>
          <p>Remove</p>
        </div>

        {list.map((item, index) => {
          return (
            <div key={index}>
              <div className="my-3 grid grid-cols-cart items-center text-xs text-gray-600 lg:text-sm">
                <img
                  src={`${url}/images/${item.image}`}
                  className="size-8 rounded-full md:size-10"
                />
                <p>{item.name}</p>
                <p className="no-scrollbar mr-3 w-5/6 overflow-scroll">
                  {item.description}
                </p>
                <p>${item.price}</p>
                <img
                  src={assets.remove_icon_red}
                  onClick={() => removeFood(item._id)}
                  className="size-8 cursor-pointer"
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
