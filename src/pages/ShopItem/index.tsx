import { CSSProperties, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AccountModal from "../../components/AccountModal";
import { ModalContext } from "../../App";
import { IItemContent } from "../../interface/itemContent.interface";
import { cardsInfo } from "../../const/cardsInfo";
import "./style.css";
import { useSetStorageItem } from "../../hooks/useSetStorageItem";

const leftStyles: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "white",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles: CSSProperties = {
  width: "100%",
  height: "450px",
  position: "relative",
};

const rightStyles: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "white",
  zIndex: 1,
  cursor: "pointer",
};

const arrowHover: CSSProperties = {
  color: "#33FF33",
};

const ShopItem: React.FC<IItemContent> = ({ setCartItem }) => {
  const [amountItem, setAmountItem] = useState<number>();
  const [itemContent, setItemContent] = useState<{
    id: number;
    title: string;
    price: number;
    image: string;
    images: {
      id: number;
      url: string;
    }[];
  }>();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [hoverLeftArrow, setHoverLeftArrow] = useState<boolean>(false);
  const [hoverRightArrow, setHoverRightArrow] = useState<boolean>(false);
  const context = useContext(ModalContext);
  const { modal } = context;
  const location = useLocation();
  const updateStorage = useSetStorageItem();
  const navigate = useNavigate();

  const fetchData = (title: string) => {
    return cardsInfo.find((item) => {
      return item.title === title;
    });
  };

  const addItemToStorage = () => {
    if (itemContent?.id !== undefined && amountItem !== undefined) {
      setCartItem({
        id: itemContent?.id,
        price: itemContent.price,
        amount: amountItem,
      });
    }
    if (isInCart) {
      navigate("/cart");
    } else {
      const parse =
        (localStorage.getItem("itemContent") &&
          JSON.parse(localStorage.getItem("itemContent")!)) ||
        [];
      const test = itemContent && [
        ...parse,
        { id: itemContent.id, price: itemContent.price, amount: 1 },
      ];
      test && updateStorage(test);
      setIsInCart(true);
    }
  };

  useEffect(() => {
    const data = fetchData(location.pathname.split("/")[2]);
    setItemContent(data);
  }, [location]);

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("itemContent") || "[]");
    const itemInCart = localItems.some(
      (item: any) => item.id === itemContent?.id
    );
    setIsInCart(itemInCart);
  }, [itemContent?.id]);

  const toPreviousImage = () => {
    const firstSlide = imageIndex === 0;
    const newIndex =
      itemContent && firstSlide
        ? itemContent?.images.length - 1
        : imageIndex - 1;
    setImageIndex(newIndex);
  };

  const toNextImage = () => {
    const lastSlide =
      itemContent && imageIndex === itemContent?.images.length - 1;
    const newIndex = lastSlide ? 0 : imageIndex + 1;
    setImageIndex(newIndex);
  };

  const slideStyles: CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${itemContent?.images[imageIndex].url})`,
  };

  return (
    <>
      <div className="shop-item">
        <Navbar />
        <div className="shop-item-main">
          <div style={sliderStyles}>
            <div
              style={{ ...leftStyles, ...(hoverLeftArrow ? arrowHover : {}) }}
              onClick={toPreviousImage}
              onMouseEnter={() => setHoverLeftArrow(true)}
              onMouseLeave={() => setHoverLeftArrow(false)}
            >
              ←
            </div>
            <div
              style={{ ...rightStyles, ...(hoverRightArrow ? arrowHover : {}) }}
              onClick={toNextImage}
              onMouseEnter={() => setHoverRightArrow(true)}
              onMouseLeave={() => setHoverRightArrow(false)}
            >
              →
            </div>
            <div style={slideStyles}></div>
          </div>
          <div className="shop-item-main-block">
            <div className="shop-item-info">
              <h2 className="shop-item-info-name">{itemContent?.title}</h2>
              <h3 className="shop-item-info-price">{`$${itemContent?.price}`}</h3>
            </div>
            <div className="shop-item-cart">
              <div>
                <button
                  className="shop-item-cart-button-cart"
                  onClick={addItemToStorage}
                >
                  <div>{isInCart ? "TO CART" : "ADD TO CART"}</div>
                </button>
              </div>
            </div>
          </div>
          <div className="shop-item-characteristics">
            <h3 className="shop-item-characteristics-title">Characteristics</h3>
            <div className="shop-item-characteristics-points"></div>
          </div>
          <div className="shop-item-tabs">
            <Link to="/shop">Shop</Link>
            {">"}
            <p className="shop-item-tabs-current">Product Name</p>
          </div>
        </div>
        <Footer />
      </div>
      {modal && <AccountModal />}
    </>
  );
};

export default ShopItem;
