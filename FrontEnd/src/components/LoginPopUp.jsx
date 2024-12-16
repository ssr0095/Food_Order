import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loadingFORM, setLoadingFORM] = useState(false);
  const [loadingPAGE, setLoadingPAGE] = useState(false);
  const [signTitle, setSignTitle] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const resetPass = () => {
    setShowLogin(false);
    setLoadingPAGE(true); // Show loader immediately
    navigate("/resetPassword", { replace: true });
    setLoadingPAGE(false); // Stop loader after React Router's navigation completes
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let newUrl =
      signTitle === "Sign up"
        ? `${url}/api/user/register`
        : `${url}/api/user/login`;

    // Trim user inputs
    const userData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.trim()]),
    );

    setLoadingFORM(true); // Form loader starts
    try {
      const res = await axios.post(newUrl, userData);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);

        if (res.data.isAccountVerified === false) {
          // If email not verified
          setLoadingPAGE(true);
          await axios.post(
            `${url}/api/user/sendOTP`,
            {},
            { headers: { token: res.data.token } },
          );
          setShowLogin(false);
          setLoadingPAGE(false);
          navigate("/verifyAccount");
        } else {
          // Email verified
          setLoadingPAGE(true);
          window.location.reload();
        }
      } else {
        // Handle account exists cases
        toast.error(res.data.message);
        if (res.data.isAccountVerified === true) {
          setSignTitle("Login");
        } else if (res.data.isAccountVerified === false) {
          setLoadingPAGE(true);
          await axios.post(
            `${url}/api/user/sendOTP`,
            {},
            { headers: { token: res.data.token } },
          );
          setShowLogin(false);
          setLoadingPAGE(false);
          navigate("/verifyAccount");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred, please try again.");
    } finally {
      setLoadingFORM(false);
      setLoadingPAGE(false);
      setShowLogin(false);
    }
  };

  return (
    <>
      <div className="absolute z-10 flex h-lvh w-full items-center justify-center bg-pop px-4">
        <form
          className="flex w-[90%] animate-fadeIn flex-col items-center gap-5 rounded-lg bg-white p-7 text-base text-gray-500 opacity-100 duration-200 md:w-[60%] lg:w-[27%]"
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
                autoComplete="name"
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
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="••••••••"
              required
              className="input invalid"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              autoComplete={
                signTitle === "Sign up" ? "new-password" : "current-password"
              }
            />
          </div>
          {signTitle === "Login" && (
            <div className="flex w-full cursor-default items-center justify-end text-sm">
              <p onClick={resetPass}>Forget password?</p>
            </div>
          )}

          <div className="flex w-full items-center justify-start gap-3">
            <input
              type="checkbox"
              required
              className="focus:ring-3 -mt-5 size-3 rounded border-4 border-green-600 bg-gray-50 focus:border-tomato"
            />
            <p className="text-xs">
              By continuing, I accept the terms of use & privacy policy.
            </p>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-tomato p-2.5 text-white shadow-sm outline-none hover:bg-tomato-hov"
            disabled={loadingFORM} // Disable button during loading
          >
            {loadingFORM ? (
              // Show the spinner during loading
              <span className="inline-flex items-center">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="me-2 inline h-4 w-4 animate-spin text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </span>
            ) : // Regular button text
            signTitle === "Sign up" ? (
              "Create account"
            ) : (
              "Login"
            )}
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
      {loadingPAGE && (
        <div
          id="loading"
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white"
        >
          <div className="relative inline-flex">
            <div className="size-12 rounded-full bg-tomato"></div>
            <div className="absolute left-0 top-0 size-12 animate-ping rounded-full bg-tomato"></div>
            <div className="absolute left-0 top-0 size-12 animate-pulse rounded-full bg-tomato"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopUp;
