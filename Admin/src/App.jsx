import React from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "https://food-order-backend-2dvi.onrender.com";
  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="flex h-fit w-full flex-col items-center bg-gray-100 font-outfit md:h-svh md:flex-row md:items-start">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
