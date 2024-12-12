import { Link } from "react-router-dom";
import "./style.css";
import { IShop } from "../../interface/shop.interface";
import { useEffect, useState } from "react";
import axios from "axios";

const ShopCards: React.FC<IShop> = ({ setShopId, dbFilteredGoods }) => {
  const [goods, setGoods] = useState<any[]>();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/all")
      .then((res) => setGoods(res.data));
  }, []);

  return (
    <>
      {/* {filteredGoods &&
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
        })} */}
      {dbFilteredGoods &&
        dbFilteredGoods.map((el, ind) => {
          return (
            <div key={ind} className="shop-card">
              <Link to={`/shop/${el.id}`}>
                <div className="shop-card-image">
                  <img src={el.image && el.image} alt="" />
                </div>
              </Link>
              <h2 className="shop-card-title" onClick={() => setShopId(el.id)}>
                <Link to={`/shop/${el.id}`} className="shop-card-t">
                  {el.name}
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
