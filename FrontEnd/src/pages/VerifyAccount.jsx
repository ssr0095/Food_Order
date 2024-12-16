import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyAccount = () => {
  const { url, token } = useContext(StoreContext);
  const inputRef = React.useRef([]);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const Q_otp = searchParams.get("otp");
  const Q_token = searchParams.get("token");
  const [loadingFORM, setLoadingFORM] = useState(false);

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
    if (Q_otp) {
      QEmailverify();
    }
  }, [Q_otp]);

  const handleResend = async () => {
    if (!isDisabled) {
      try {
        setIsDisabled(true);
        localStorage.setItem("isDisabled", true);
        localStorage.setItem("lastDisabledTime", Date.now()); // Save the timestamp

        await axios.post(`${url}/api/user/sendOTP`, {}, { headers: { token } });
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

  // const pasteHandler = (e) => {
  //   e.preventDefault();
  //   const paste = e.clipboardData.getData("text");
  //   const pasteData = paste.split("");
  //   pasteData.forEach((char, index) => {
  //     if (inputRef.current[index]) inputRef.current[index].value = char;
  //   });
  // };

  const pasteHandler = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && /^\d{6}$/.test(pasteData)) {
      [...pasteData].forEach((num, idx) => {
        if (inputRef.current[idx]) {
          inputRef.current[idx].value = num;
        }
      });
      inputRef.current[5]?.focus();
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoadingFORM(true);
    try {
      const OTParray = inputRef.current.map((e) => e.value);
      const OTP = OTParray.join("");
      const res = await axios.post(
        url + "/api/user/verifyAccount",
        { OTP },
        { headers: { token } },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoadingFORM(false);
    }
  };

  const QEmailverify = async () => {
    setLoadingFORM(true);
    try {
      const res = await axios.post(
        url + "/api/user/verifyAccount",
        { OTP: Q_otp },
        { headers: { token: Q_token } },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error: " + error.message);
    } finally {
      setLoadingFORM(false);
    }
  };

  // useEffect(() => {
  //   isVerified && navigate("/");
  // }, [isVerified]);

  return (
    <>
      <main className="relative flex h-full flex-col justify-center overflow-hidden bg-slate-50">
        <div className="mx-auto w-1/2 max-w-6xl px-4 py-24 md:px-6">
          <div className="flex justify-center">
            <div className="mx-auto max-w-md rounded-xl bg-white px-4 py-10 text-center shadow sm:px-8">
              <header className="mb-8">
                <h1 className="mb-1 text-2xl font-bold">Email Verification</h1>
                <p className="text-[15px] text-slate-500">
                  Enter the 6-digit verification code that was sent to your
                  email address.
                </p>
              </header>
              <form id="otp-form" onSubmit={onSubmitHandler}>
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
                    ) : (
                      "Verify Account"
                    )}
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
      </main>
    </>
  );
};

export default VerifyAccount;
