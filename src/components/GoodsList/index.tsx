import React from "react";
import { cardsInfo } from "../../const/cardsInfo";
import "./style.css";
import { IGoodsList } from "../../interface/goodsList.interface";
import { Link } from "react-router-dom";

const GoodsList: React.FC<IGoodsList> = ({
  searchResult,
  setFilteredGoods,
  setFocusHandler,
  timeoutIDRef,
  inputRef,
  setInputValue,
}) => {
  const clickHandler = (el: {
    id: number;
    title: string;
    price: number;
    image: string;
    images: {
      id: number;
      url: string;
    }[];
  }) => {
    setInputValue && setInputValue(el.title);
    setFilteredGoods && setFilteredGoods([el]);
    setFocusHandler && setFocusHandler(false);
    inputRef?.current && inputRef.current.blur();
    if (timeoutIDRef?.current) {
      clearTimeout(timeoutIDRef.current);
      timeoutIDRef.current = null;
    }
  };

  return (
    <>
      {cardsInfo &&
        searchResult().map((el, ind) => {
          return (
            <div
              className="goods"
              key={ind}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => clickHandler(el)}
            >
              {el.title}
            </div>
          );
        })}
    </>
  );
};

export default GoodsList;
