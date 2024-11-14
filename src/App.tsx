import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Videos from "./pages/Videos";
import ShopItem from "./pages/ShopItem";
import React, { useEffect, useState } from "react";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import { IContext } from "./interface/context.interface";

export const ModalContext = React.createContext<IContext>({
  modal: false,
  switchHandler: () => {},
});

function App() {
  const [shopTitle, setShopTitle] = useState<string>();
  const [modal, setModal] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<{
    id: number;
    price: number;
    amount: number;
  }>();

  const switchHandler = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    if (cartItem) {
      localStorage.setItem("itemContent", JSON.stringify([cartItem]));
      console.log(cartItem);
    }
  }, [cartItem]);

  return (
    <ModalContext.Provider value={{ modal, switchHandler }}>
      <Router>
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="/shop" element={<Shop setShopTitle={setShopTitle} />} />
          <Route
            path={`/shop/:${shopTitle}`}
            element={<ShopItem setCartItem={setCartItem} />}
          />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ModalContext.Provider>
  );
}
export default App;
