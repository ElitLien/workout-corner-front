import React from "react";
import { cardsInfo } from "../../const/cardsInfo";
import "./style.css";
import { IGoodsList } from "../../interface/goodsList.interface";
import { Link } from "react-router-dom";

const GoodsList: React.FC<IGoodsList> = ({ searchResult }) => {
  return (
    <>
      {cardsInfo &&
        searchResult().map((el, ind) => {
          return (
            <Link className="goods" key={ind} to={`/shop/${el.title}`}>
              {el.title}
            </Link>
          );
        })}
    </>
  );
};

export default GoodsList;
