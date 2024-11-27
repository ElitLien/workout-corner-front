import "./style.css";
import Footer from "../../components/Footer";
import ShopCards from "../../components/ShopCards";
import { IShop } from "../../interface/shop.interface";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../App";
import AccountModal from "../../components/AccountModal";
import Navbar from "../../components/Navbar";
import { cardsInfo } from "../../const/cardsInfo";

const Shop: React.FC<IShop> = ({ setShopTitle }) => {
  const context = useContext(ModalContext);
  const [filteredGoods, setFilteredGoods] = useState(cardsInfo);
  const { modal } = context;
  const [showArrow, setShowArrow] = useState<boolean>(false);

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

  return (
    <>
      <div className="shop">
        <Navbar setFilteredGoods={setFilteredGoods} />
        <div className="shop-main">
          <div className="shop-main-left">
            <h1>Catalog</h1>
            <div className="shop-left-container">
              <div className="shop-left-container-sort">type of product 1</div>
              <div className="shop-left-container-sort">type of product 2</div>
              <div className="shop-left-container-sort">type of product 3</div>
              <div className="shop-left-container-sort">type of product 4</div>
              <div className="shop-left-container-sort">type of product 5</div>
              <div className="shop-left-container-sort">type of product 6</div>
              <div className="shop-left-container-sort">type of product 7</div>
              <div className="shop-left-container-sort">type of product 8</div>
              <div className="shop-left-container-sort">type of product 9</div>
              <div className="shop-left-container-sort">type of product 10</div>
              <div className="shop-left-container-sort">type of product 11</div>
            </div>
          </div>
          <div className="shop-main-right">
            <div className="shop-right-cards">
              <ShopCards
                setShopTitle={setShopTitle}
                filteredGoods={filteredGoods}
              />
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
      </div>
      {modal && <AccountModal />}
    </>
  );
};

export default Shop;
