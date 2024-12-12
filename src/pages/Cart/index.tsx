import { useEffect, useState } from "react";
import { useContext } from "react";
import "./style.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AccountModal from "../../components/AccountModal";
import CartItem from "../../components/CartItem";
import { ModalContext } from "../../App";
import { cardsInfo } from "../../const/cardsInfo";
import { useSetStorageItem } from "../../hooks/useSetStorageItem";
import Modal from "../../components/Modal";
import axios from "axios";
import { IDbStorage } from "../../interface/dbStorage.interface";

const Cart = () => {
  const storage = localStorage.getItem("itemContent");
  const parse = storage && JSON.parse(storage);
  const [items, setItems] = useState<any[]>(parse);
  const [total, setTotal] = useState<number>(0);
  const [buyModal, setBuyModal] = useState<boolean>(false);
  const context = useContext(ModalContext);
  const { modal } = context;
  const updateStorage = useSetStorageItem();
  const [showArrow, setShowArrow] = useState<boolean>(false);
  const [dbStorage, setDbStorage] = useState<IDbStorage[]>();

  const checkScrollHeight = () => {
    setShowArrow(window.scrollY > 150);
  };

  useEffect(() => {
    checkScrollHeight();

    window.addEventListener("scroll", checkScrollHeight);

    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, []);

  const calculateTotal = (items: any[]) => {
    const newTotal =
      items &&
      items.reduce((acc, item) => {
        const card = dbStorage && dbStorage.find((info) => info.id === item.id);
        return card ? acc + card.price * item.amount : acc;
      }, 0);
    setTotal(newTotal);
  };

  const removeItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    updateStorage(updatedItems);
  };

  const addAmount = (id: number) => {
    const anotherArray = items.map((item) => {
      return item.id === id
        ? { id: id, price: item.price, amount: item.amount + 1 }
        : { id: item.id, price: item.price, amount: item.amount };
    });
    updateStorage(anotherArray);
  };

  const removeAmount = (id: number) => {
    const anotherArray = items.map((item) => {
      return item.id === id && item.amount > 1
        ? { id: id, price: item.price, amount: item.amount - 1 }
        : { id: item.id, price: item.price, amount: item.amount };
    });
    updateStorage(anotherArray);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products/all"
      );
      setDbStorage(response.data);
    } catch {
      console.error("Don't fetch data!!!");
    }
  };

  const successPurchase = () => {
    updateStorage([]);
    setBuyModal(true);
  };

  useEffect(() => {
    const handleStorageUpdate = (event: any) => {
      if (event.detail && event.detail.key === "itemContent") {
        const updatedItems = JSON.parse(event.detail.newValue);
        setItems(updatedItems);
        calculateTotal(updatedItems);
      }
    };

    window.addEventListener("localStorageUpdated", handleStorageUpdate);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageUpdate);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dbStorage && calculateTotal(items);
  }, [items, dbStorage]);

  return (
    <div className="cart">
      <Navbar />
      <div className="cart-main">
        <h1 className="cart-main-title">Shopping Cart</h1>
        {items && items.length > 0 ? (
          items.map((el: any, ind: number) => {
            return (
              <div key={ind}>
                <CartItem
                  content={el}
                  onRemoveItem={removeItem}
                  onAddAmount={addAmount}
                  onRemoveAmount={removeAmount}
                />
              </div>
            );
          })
        ) : (
          <div className="cart-main-empty">Cart empty</div>
        )}
        <div className="cart-main-count-section">
          <div className="cart-main-count-section-total">
            <div className="cart-main-total">
              <h3 className="cart-main-total-text">Subtotal</h3>
              <div className="cart-main-total-price">{`$${
                total ? total : 0
              }`}</div>
            </div>
            {items.length > 0 && (
              <button className="cart-main-button" onClick={successPurchase}>
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
      {document.documentElement.scrollHeight >
      document.documentElement.clientHeight ? (
        <Footer />
      ) : (
        <footer style={{ marginTop: "auto" }}>
          <Footer />
        </footer>
      )}
      {showArrow && (
        <div className="arrow-container">
          <div
            className="arrow-up"
            onClick={() =>
              window.scroll({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            ▲
          </div>
        </div>
      )}
      {buyModal && <Modal buyModal={buyModal} setBuyModal={setBuyModal} />}
      {modal && <AccountModal />}
    </div>
  );
};

export default Cart;
