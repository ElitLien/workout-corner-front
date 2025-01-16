import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import { ICartItem } from "../../interface/cartItem.interface";
import { cardsInfo } from "../../const/cardsInfo";
import { IDbStorage } from "../../interface/dbStorage.interface";
import axios from "axios";

const CartItem: React.FC<ICartItem> = ({
  content,
  onRemoveItem,
  onAddAmount,
  onRemoveAmount,
}) => {
  const [itemContent, setItemContent] = useState<IDbStorage>();

  const itemTotalPrice = useMemo(() => {
    return itemContent ? itemContent.price * content.amount : 0;
  }, [itemContent, content.amount]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${content.id}`
      );
      setItemContent(response.data);
    } catch {
      console.error("Don't fetch data!!!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [content.id]);

  return (
    <div className="cart-item">
      <div className="cart-item-first-block">
        <div className="cart-item-first-block-image">
          <img src={`data:image/jpeg;base64,${itemContent?.image}`} alt="" />
        </div>
        <h3 className="cart-item-first-block-title">{itemContent?.name}</h3>
      </div>
      <div className="cart-item-second-block">
        <div className="cart-item-second-block-quintity">
          <div
            className="cart-item-second-block-quintity-button"
            onClick={() => onRemoveAmount(content.id)}
          >
            -
          </div>
          <input
            className="cart-item-second-block-quintity-number"
            type="number"
            value={content.amount}
            readOnly
          />
          <div
            className="cart-item-second-block-quintity-button"
            onClick={() => onAddAmount(content.id)}
          >
            +
          </div>
        </div>
        <div className="cart-item-second-block-price">${itemTotalPrice}</div>
        <div
          className="cart-item-second-block-remove"
          onClick={() => onRemoveItem(content.id)}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default CartItem;
