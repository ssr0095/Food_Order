import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const { url } = useContext(StoreContext);
  const inputRef = React.useRef([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [OTP, setOTP] = useState(0);
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [searchParams] = useSearchParams();
  const Q_otp = searchParams.get("otp");
  const Q_email = searchParams.get("email");

  // Restore button state on component load
  useEffect(() => {
    const isDisabledFromStorage = localStorage.getItem("isDisabled") === "true";
    const lastDisabledTime = localStorage.getItem("lastDisabledTime");
    const currentTime = Date.now();

    if (isDisabledFromStorage && lastDisabledTime) {
      const elapsed = currentTime - Number(lastDisabledTime);
      const remainingTime = 180000 - elapsed; // 30 seconds countdown

      if (remainingTime > 0) {
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
          localStorage.setItem("isDisabled", false);
        }, remainingTime);
      } else {
        setIsDisabled(false);
        localStorage.setItem("isDisabled", false);
      }
    }
    if (Q_email || Q_otp) {
      QsumbitOTP();
    }
  }, [Q_email, Q_otp]);

  const handleResend = async () => {
    if (!isDisabled) {
      try {
        setIsDisabled(true);
        localStorage.setItem("isDisabled", true);
        localStorage.setItem("lastDisabledTime", Date.now()); // Save the timestamp

        await axios.post(`${url}/api/user/sendResetOTP`, { email });
      } catch (error) {
        console.error("Error resending OTP:", error.message);
      } finally {
        setTimeout(() => {
          setIsDisabled(false);
          localStorage.setItem("isDisabled", false);
        }, 30000); // Disable for 30 seconds
      }
    }
  };

  const inputHandler = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const keyDownHandler = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const pasteHandler = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteData = paste.split("");
    pasteData.forEach((char, index) => {
      if (inputRef.current[index]) inputRef.current[index].value = char;
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/sendResetOTP`, { email });

      if (res.data.success) {
        toast.success(res.data.message);
        setIsEmailSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    try {
      const OTParray = inputRef.current.map((e) => e.value);
      const otp = OTParray.join("");
      setOTP(otp);
      console.log(OTP, email);
      const res = await axios.post(url + "/api/user/verifyResetOTP", {
        OTP,
        email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsOTPsent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const QsumbitOTP = async () => {
    try {
      setOTP(Q_otp);
      setEmail(Q_email);
      setIsEmailSent(true);
      const res = await axios.post(url + "/api/user/verifyResetOTP", {
        OTP: Q_otp,
        email: Q_email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsOTPsent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      return toast.error("Enter strong password");
    }
    try {
      const res = await axios.post(url + "/api/user/resetPassword", {
        password: newPassword,
        email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   isVerified && navigate("/");
  // }, [isVerified]);

  return (
    <>
      <main className="relative flex h-full flex-col justify-center overflow-hidden bg-slate-50">
        {/* Email */}
        {!isEmailSent && (
          <div className="mx-auto w-1/2 max-w-6xl px-4 py-24 md:px-6">
            <div className="flex justify-center">
              <div className="mx-auto max-w-md rounded-xl bg-white px-4 py-10 text-center shadow sm:px-8">
                <header className="mb-8">
                  <h1 className="mb-1 text-2xl font-bold">Reset Password</h1>
                  <p className="text-[15px] text-slate-500">
                    Enter your registered email address
                  </p>
                </header>
                <form id="otp-form" onSubmit={onSubmitEmail}>
                  <div className="flex items-center justify-center gap-3">
                    <input
                      type="email"
                      className="input invalid"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mx-auto mt-4 max-w-[260px]">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center whitespace-nowrap rounded-lg bg-tomato px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 hover:bg-tomato-hov focus:outline-none focus:ring focus:ring-tomato focus-visible:outline-none focus-visible:ring focus-visible:ring-tomato"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* OTP */}
        {!isOTPsent && isEmailSent && (
          <div className="mx-auto w-1/2 max-w-6xl px-4 py-24 md:px-6">
            <div className="flex justify-center">
              <div className="mx-auto max-w-md rounded-xl bg-white px-4 py-10 text-center shadow sm:px-8">
                <header className="mb-8">
                  <h1 className="mb-1 text-2xl font-bold">
                    Reset Password OTP
                  </h1>
                  <p className="text-[15px] text-slate-500">
                    Enter the 6-digit verification code that was sent to your
                    email address.
                  </p>
                </header>
                <form id="otp-form" onSubmit={onSubmitOTP}>
                  <div
                    className="flex items-center justify-center gap-3"
                    onPaste={(e) => pasteHandler}
                  >
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <input
                          type="text"
                          className="h-12 w-12 appearance-none rounded border border-gray-500 bg-slate-100 text-center text-lg font-extrabold text-slate-900 outline-none focus:border-none focus:bg-white focus:ring-2 focus:ring-tomato"
                          pattern="\d*"
                          required
                          maxLength="1"
                          key={index}
                          ref={(e) => (inputRef.current[index] = e)}
                          onInput={(e) => inputHandler(e, index)}
                          onKeyDown={(e) => keyDownHandler(e, index)}
                        />
                      ))}
                  </div>
                  <div className="mx-auto mt-4 max-w-[260px]">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center whitespace-nowrap rounded-lg bg-tomato px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 hover:bg-tomato-hov focus:outline-none focus:ring focus:ring-tomato focus-visible:outline-none focus-visible:ring focus-visible:ring-tomato"
                    >
                      Continue
                    </button>
                  </div>
                </form>
                <div className="mt-4 text-sm text-slate-500">
                  Didn't receive code?{" "}
                  <button
                    className={`font-medium ${
                      isDisabled
                        ? "cursor-not-allowed text-slate-500"
                        : "text-tomato hover:text-tomato-hov"
                    } `}
                    onClick={handleResend}
                  >
                    Resend
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* New password */}
        {isEmailSent && isOTPsent && (
          <div className="mx-auto w-1/2 max-w-6xl px-4 py-24 md:px-6">
            <div className="flex justify-center">
              <div className="mx-auto max-w-md rounded-xl bg-white px-4 py-10 text-center shadow sm:px-8">
                <header className="mb-8">
                  <h1 className="mb-1 text-2xl font-bold">New Password</h1>
                  <p className="text-[15px] text-slate-500">
                    Enter your new password
                  </p>
                </header>
                <form id="otp-form" onSubmit={onSubmitPassword}>
                  <div className="flex items-center justify-center gap-3">
                    <input
                      type="password"
                      className="input invalid"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="mx-auto mt-4 max-w-[260px]">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center whitespace-nowrap rounded-lg bg-tomato px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 hover:bg-tomato-hov focus:outline-none focus:ring focus:ring-tomato focus-visible:outline-none focus-visible:ring focus-visible:ring-tomato"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default ResetPassword;
