import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalAmt, url, token, foodList, cartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  let TAX = Math.round(getTotalAmt() * (2 / 10));

  const [address, setAdress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdress((address) => ({ ...address, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let iteminfo = item;
        iteminfo["quantity"] = cartItems[item._id];
        orderItems.push(iteminfo);
      }
    });
    let orderData = {
      address: address,
      items: orderItems,
      amount: getTotalAmt() + 5 + 79,
    };
    const res = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    navigate(`/payment?orderId=${res.data.orderId}`);
    // if (res.data.success) {
    //   const session_url = res.data.session_url;
    //   window.location.replace(session_url);
    // } else {
    //   alert("Error");
    // }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalAmt() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      action="#"
      className="my-20 flex flex-col items-start justify-between gap-14 lg:flex-row"
    >
      <div className="w-full space-y-4 lg:w-2/5">
        <p className="text-xl font-semibold text-gray-900">
          Delivery information
        </p>
        <div className="flex w-full items-center gap-4">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={address.firstName}
            placeholder="First name"
            className="input invalid"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={address.lastName}
            placeholder="last name"
            className="input invalid"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={address.email}
          placeholder="Email"
          className="input invalid"
          required
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={address.street}
          placeholder="Street"
          className="input invalid"
          required
        />
        <div className="flex w-full items-center gap-4">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={address.city}
            placeholder="City"
            className="input invalid"
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={address.state}
            placeholder="State"
            className="input invalid"
            required
          />
        </div>
        <div className="flex w-full items-center gap-4">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={address.zipcode}
            placeholder="Zip code"
            className="input invalid"
            required
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={address.country}
            placeholder="Country"
            className="input invalid"
            required
          />
        </div>
        <input
          type="phone"
          name="phone"
          onChange={onChangeHandler}
          value={address.phone}
          placeholder="Phone"
          className="input invalid"
          required
        />
      </div>
      <div className="flex w-full flex-col gap-5 lg:w-2/5">
        <h2 className="text-xl font-semibold text-gray-900">Cart Total</h2>
        <div>
          <div className="my-3 flex items-center justify-between text-base text-gray-900">
            <p>Subtotal</p>
            <p>${getTotalAmt()}</p>
          </div>
          <hr />
          <div className="my-3 flex items-center justify-between text-base text-gray-900">
            <p>Delivary fee</p>
            <p>${getTotalAmt() === 0 ? 0 : 5}</p>
          </div>
          <hr />
          <div className="my-3 flex items-center justify-between text-base text-gray-900">
            <p>
              Tax <span className="text-xs text-gray-400">(18%)</span>
            </p>
            <p>${getTotalAmt() === 0 ? 0 : TAX}</p>
          </div>
          <hr />
          <div className="my-3 flex items-center justify-between text-xl font-semibold text-gray-900">
            <p>Total</p>
            <p>${getTotalAmt() === 0 ? 0 : getTotalAmt() + 5 + TAX}</p>
          </div>
          <hr />
        </div>
        <button
          type="submit"
          className="mt-4 w-full cursor-pointer rounded-lg bg-tomato px-4 py-2 text-lg text-white lg:w-2/3"
        >
          Proceed to payment
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
