import { Link } from "react-router-dom";
import "./style.css";
import { IShop } from "../../interface/shop.interface";

const ShopCards: React.FC<IShop> = ({ setShopTitle, filteredGoods }) => {
  return (
    <>
      {filteredGoods &&
        filteredGoods.map((el, ind) => {
          return (
            <div key={ind} className="shop-card">
              <Link to={`/shop/${el.title}`}>
                <div className="shop-card-image">
                  <img src={el.image} alt="" />
                </div>
              </Link>
              <h2
                className="shop-card-title"
                onClick={() => setShopTitle(el.title)}
              >
                <Link to={`/shop/${el.title}`} className="shop-card-t">
                  {el.title}
                </Link>
              </h2>
              <p className="shop-card-price">{`$${el.price}`}</p>
            </div>
          );
        })}
    </>
  );
};

export default ShopCards;
