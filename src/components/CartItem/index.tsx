import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import { ICartItem } from "../../interface/cartItem.interface";
import { cardsInfo } from "../../const/cardsInfo";

const CartItem: React.FC<ICartItem> = ({
  content,
  onRemoveItem,
  onAddAmount,
  onRemoveAmount,
}) => {
  const [itemContent, setItemContent] = useState<{
    id: number;
    price: number;
    title: string;
    image: string;
  }>();

  const itemTotalPrice = useMemo(() => {
    return itemContent ? itemContent.price * content.amount : 0;
  }, [itemContent, content.amount]);

  const fetchData = (id: number) => {
    return cardsInfo.find((item) => item.id === id);
  };

  useEffect(() => {
    const data = fetchData(content.id);
    setItemContent(data);
  }, [content.id]);

  return (
    <div className="cart-item">
      <div className="cart-item-first-block">
        <div className="cart-item-first-block-image">
          <img src={itemContent?.image} alt="" />
        </div>
        <h3 className="cart-item-first-block-title">{itemContent?.title}</h3>
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
