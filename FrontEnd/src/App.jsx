import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import LoginPopUp from "./components/LoginPopUp";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import Verify from "./pages/Verify";
import VerifyAccount from "./pages/VerifyAccount";
import ResetPassword from "./pages/ResetPassword";
import MyOrders from "./pages/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const hideHeaderFooterRoutes = ["/verifyAccount", "/resetPassword"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname,
  );

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className="mx-auto w-[85%] font-outfit md:w-4/5">
        {!shouldHideHeaderFooter && <NavBar setShowLogin={setShowLogin} />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/verifyAccount" element={<VerifyAccount />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default App;
