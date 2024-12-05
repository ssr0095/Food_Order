import React, { useState } from "react";
import Header from "../components/Header";
import MenuItems from "../components/MenuItems";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <MenuItems category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
