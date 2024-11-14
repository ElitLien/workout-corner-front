import { Link } from "react-router-dom";
import { cardsInfo } from "../../const/cardsInfo";
import "./style.css";
import { IShop } from "../../interface/shop.interface";

const ShopCards: React.FC<IShop> = ({ setShopTitle }) => {
  return (
    <>
      {cardsInfo &&
        cardsInfo.map((el, ind) => {
          return (
            <div key={ind} className="shop-card">
              <Link to={`/shop/${el.title}`}>
                <div className="shop-card-image">
                  <img src={el.image} alt="" />
                </div>
                <h2
                  className="shop-card-title"
                  onClick={() => setShopTitle(el.title)}
                >
                  {el.title}
                </h2>
              </Link>
              <p className="shop-card-price">{`$${el.price}`}</p>
            </div>
          );
        })}
    </>
  );
};

export default ShopCards;
