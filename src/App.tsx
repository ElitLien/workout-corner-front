import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Videos from "./pages/Videos";
import ShopItem from "./pages/ShopItem";
import React, { useContext, useEffect, useState } from "react";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import { IContext } from "./interface/context.interface";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";

export const ModalContext = React.createContext<IContext>({
  modal: false,
  switchHandler: () => {},
});

function App() {
  const [shopId, setShopId] = useState<number>();
  const [modal, setModal] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<{
    id: number;
    price: number;
    amount: number;
  }>();
  const tokenStorage = localStorage.getItem("decodeTokenData");
  const parseToken = tokenStorage && JSON.parse(tokenStorage);
  const [decodeToken, setDecodeToken] = useState<any>(parseToken);

  const switchHandler = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    if (cartItem) {
      localStorage.setItem("itemContent", JSON.stringify([cartItem]));
      console.log(cartItem);
    }
  }, [cartItem]);

  useEffect(() => {
    const localToken = localStorage.getItem("decodeTokenData");
    localToken && setDecodeToken(JSON.parse(localToken));
  }, []);

  return (
    <ModalContext.Provider value={{ modal, switchHandler }}>
      <Router>
        <Routes>
          <Route path="/workout-corner-front" element={<Homepage />} />
          <Route
            path="/workout-corner-front/shop"
            element={<Shop setShopId={setShopId} />}
          />
          <Route
            path={`/workout-corner-front/shop/:${shopId}`}
            element={<ShopItem setCartItem={setCartItem} />}
          />
          <Route path="/workout-corner-front/videos" element={<Videos />} />
          <Route path="/workout-corner-front/contact" element={<Contact />} />
          {decodeToken?.role === "ADMIN" && (
            <Route path="/workout-corner-front/users" element={<Users />} />
          )}
          <Route path="/workout-corner-front/cart" element={<Cart />} />
          <Route path="/workout-corner-front/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </ModalContext.Provider>
  );
}
export default App;
