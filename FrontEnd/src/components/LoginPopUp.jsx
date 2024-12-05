import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [signTitle, setSignTitle] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let newUrl = url;
    if (signTitle == "Sign up") {
      newUrl += "/api/user/register";
    } else {
      newUrl += "/api/user/login";
    }

    try {
      const res = await axios.post(newUrl, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        toast.success(res.data.message);
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error");
      console.log("Error: " + error);
    }
  };
  return (
    <div className="absolute z-10 flex h-lvh w-full items-center justify-center bg-pop px-4">
      <form
        className="flex max-w-[20rem] animate-fadeIn flex-col items-center gap-5 rounded-lg bg-white p-7 text-base text-gray-500 opacity-100 duration-200"
        onSubmit={onSubmitHandler}
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold text-gray-900">{signTitle}</p>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            className="w-4"
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          {signTitle === "Sign up" && (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Name"
              required
              className="input invalid"
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email"
            required
            className="input invalid"
          />
          <input
            type="Password"
            placeholder="••••••••"
            required
            className="input invalid"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>
        <div className="flex w-full items-center justify-start gap-3">
          <input
            type="checkbox"
            required
            className="focus:ring-3 -mt-5 size-5 rounded border-4 border-green-600 bg-gray-50 focus:border-tomato"
          />
          <p className="text-sm">
            By continuing, I accept the terms of use & privacy policy.
          </p>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-tomato p-2.5 text-white shadow-sm outline-none hover:bg-tomato-hov"
        >
          {signTitle === "Sign up" ? "Create account" : "Login"}
        </button>
        {signTitle === "Login" ? (
          <p>
            Don't have an account?
            <span
              onClick={() => setSignTitle("Sign up")}
              className="ml-2 cursor-pointer text-tomato hover:underline"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span
              onClick={() => setSignTitle("Login")}
              className="ml-2 cursor-pointer text-tomato hover:underline"
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
