import "./style.css";
import Footer from "../../components/Footer";
import ShopCards from "../../components/ShopCards";
import { IShop } from "../../interface/shop.interface";
import { useContext } from "react";
import { ModalContext } from "../../App";
import AccountModal from "../../components/AccountModal";
import Navbar from "../../components/Navbar";

const Shop: React.FC<IShop> = ({ setShopTitle }) => {
  const context = useContext(ModalContext);
  const { modal } = context;

  return (
    <>
      <div className="shop">
        <Navbar />
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
              <ShopCards setShopTitle={setShopTitle} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {modal && <AccountModal />}
    </>
  );
};

export default Shop;
