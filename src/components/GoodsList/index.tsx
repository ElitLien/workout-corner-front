import React, { useEffect, useState } from "react";
import { cardsInfo } from "../../const/cardsInfo";
import "./style.css";
import { IGoodsList } from "../../interface/goodsList.interface";
import { Link } from "react-router-dom";
import { IDbStorage } from "../../interface/dbStorage.interface";
import axios from "axios";

const GoodsList: React.FC<IGoodsList> = ({
  searchResult,
  setDbFilteredGoods,
  setFocusHandler,
  timeoutIDRef,
  inputRef,
  setInputValue,
}) => {
  const [dbStorage, setDbStorage] = useState<IDbStorage[]>();
  const clickHandler = (el: {
    id: number;
    createdAt: string;
    description: string;
    image: string;
    name: string;
    price: number;
    categoryId: number;
  }) => {
    setInputValue && setInputValue(el.name);
    setDbFilteredGoods && setDbFilteredGoods([el]);
    setFocusHandler && setFocusHandler(false);
    inputRef?.current && inputRef.current.blur();
    if (timeoutIDRef?.current) {
      clearTimeout(timeoutIDRef.current);
      timeoutIDRef.current = null;
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/all")
      .then((res) => setDbStorage(res.data));
  }, []);

  return (
    <>
      {dbStorage &&
        searchResult().map((el, ind) => {
          return (
            <div
              className="goods"
              key={ind}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => clickHandler(el)}
            >
              {el.name}
            </div>
          );
        })}
    </>
  );
};

export default GoodsList;
