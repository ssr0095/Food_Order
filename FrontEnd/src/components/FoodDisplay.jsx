import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodCard from "./FoodCard";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
        Top dishes near you
      </h2>
      <div className="mt-8 grid grid-cols-foods items-center justify-center gap-8">
        {foodList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodCard
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
