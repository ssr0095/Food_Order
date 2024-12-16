import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  // const [isVerified, setIsVerified] = useState(false);

  const url = "https://food-order-backend-2dvi.onrender.com";

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } },
      );
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } },
      );
    }
  };

  // const getUserVerification = async () => {
  //   try {
  //     const res = await axios.post(
  //       url + "/api/user/isAuth",
  //       {},
  //       {
  //         headers: { token },
  //       },
  //     );
  //     setIsVerified(res.data.success);
  //     console.log(isVerified + "is verified");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const fetchFoodList = async () => {
    const res = await axios.post(url + "/api/food/list");
    setFoodList(res.data.data);
  };

  const loadCartData = async (token) => {
    if (token) {
      const res = await axios.get(url + "/api/cart/get", {
        headers: { token },
      });
      setCartItems(res.data.data);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
      // await getUserVerification();
      await loadCartData(localStorage.getItem("token"));
    }
    loadData();
  }, []);

  const getTotalAmt = () => {
    let totAmt = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemAvailable = foodList.find(
          (food) => food._id.toString() === item,
        ); // collecting items from the foo list by the item id for getting price

        totAmt += itemAvailable.price * cartItems[item];
      }
    }
    return totAmt;
  };

  const contextValue = {
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalAmt,
    url,
    token,
    setToken,
    // isVerified,
    // getUserVerification,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};


export default StoreContextProvider;
