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
import axios from "axios";
import { IDbStorage } from "../../interface/dbStorage.interface";

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

const ShopItem: React.FC<IItemContent> = () => {
  const [itemContent, setItemContent] = useState<IDbStorage>();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [hoverLeftArrow, setHoverLeftArrow] = useState<boolean>(false);
  const [hoverRightArrow, setHoverRightArrow] = useState<boolean>(false);
  const context = useContext(ModalContext);
  const { modal, switchHandler } = context;
  const location = useLocation();
  const updateStorage = useSetStorageItem();
  const navigate = useNavigate();
  const [showArrow, setShowArrow] = useState<boolean>(false);
  const [reviewWindow, setReviewWindow] = useState<boolean>(false);
  const [reviewRating, setReviewRating] = useState<number>();
  const [reviewText, setReviewText] = useState<string>();
  const tokenStorage = localStorage.getItem("authToken");
  const [token, setToken] = useState<string | null>(tokenStorage);
  const [userId, setUserId] = useState<number>();
  const [dbReviews, setDbReviews] = useState<
    {
      id: number;
      userId: number;
      productId: number;
      rating: number;
      text: string;
      createdAt: string;
    }[]
  >();

  const checkScrollHeight = () => {
    setShowArrow(window.scrollY > 150);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    checkScrollHeight();

    window.addEventListener("scroll", checkScrollHeight);

    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, []);

  const fetchData = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`
      );
      setItemContent(response.data);
    } catch {
      console.error("Don't fetch data!!!!!");
    }
  };

  const addItemToStorage = () => {
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

  const createReview = () => {
    try {
      axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews/create`,
        {
          userId: userId,
          productId: +location.pathname.split("/")[2],
          rating: reviewRating,
          text: reviewText,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.alert("Review was created!!!");
    } catch (er) {
      console.error("Don't create review: ", er);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reviews/all`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productReview = res.data.filter(
        (el: {
          id: number;
          userId: number;
          productId: number;
          rating: number;
          text: string;
          createdAt: string;
        }) => {
          if (el.productId === +location.pathname.split("/")[2]) return el;
        }
      );
      console.log("productReview: ", productReview);
      setDbReviews(productReview);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData(+location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("itemContent") || "[]");
    const itemInCart = localItems.some(
      (item: any) => item.id === itemContent?.id
    );
    setIsInCart(itemInCart);
  }, [itemContent?.id]);

  useEffect(() => {
    const localId = localStorage.getItem("decodeTokenData");
    const localIdParse = localId && JSON.parse(localId);
    setUserId(localIdParse.userId);
    loadReviews();
  }, []);

  // const toPreviousImage = () => {
  //   const firstSlide = imageIndex === 0;
  //   const newIndex =
  //     itemContent && firstSlide
  //       ? itemContent?.images.length - 1
  //       : imageIndex - 1;
  //   setImageIndex(newIndex);
  // };

  // const toNextImage = () => {
  //   const lastSlide =
  //     itemContent && imageIndex === itemContent?.images.length - 1;
  //   const newIndex = lastSlide ? 0 : imageIndex + 1;
  //   setImageIndex(newIndex);
  // };

  // const slideStyles: CSSProperties = {
  //   width: "100%",
  //   height: "100%",
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   backgroundImage: `url(${itemContent?.images[imageIndex].url})`,
  // };

  return (
    <>
      <div className="shop-item">
        <Navbar />
        <div className="shop-item-main">
          {/* <div style={sliderStyles}>
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
          </div> */}
          <div className="shop-item-main-block">
            <div className="shop-item-info">
              <h2 className="shop-item-info-name">{itemContent?.name}</h2>
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
            <div className="shop-item-characteristics-points">
              {itemContent?.description}
            </div>
          </div>
          <div className="shop-item-reviews">
            <h3 className="shop-item-reviews-title">Reviews</h3>
            {localStorage.getItem("authToken") ? (
              <button
                className="shop-item-reviews-apply"
                onClick={() => setReviewWindow(true)}
              >
                Add review
              </button>
            ) : (
              <>
                <div>You must register to post a review</div>
                <button onClick={() => switchHandler()}>Login</button>
              </>
            )}
            {reviewWindow && (
              <div className="shop-item-reviews-edit">
                <h3>Create review</h3>
                <div>Rating</div>
                <input
                  type="number"
                  className="shop-item-reviews-edit-rating"
                  step="0.1"
                  min="0"
                  max="5"
                  onChange={(e) => setReviewRating(+e.target.value)}
                ></input>
                <div>Text</div>
                <textarea
                  name="text-review"
                  id="shop-item-reviews-edit-text"
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <div className="shop-item-reviews-edit-buttons">
                  <button
                    className="shop-item-reviews-edit-buttons-create"
                    onClick={createReview}
                  >
                    Create
                  </button>
                  <button
                    className="shop-item-reviews-edit-buttons-close"
                    onClick={() => setReviewWindow(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <div className="shop-item-reviews-show">
              {dbReviews &&
                dbReviews.map((el, ind) => {
                  return (
                    <div className="shop-item-reviews-show-unit">
                      <div>{el.createdAt}</div>
                      <div>{el.rating}</div>
                      <div>{el.text}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="shop-item-tabs">
            <Link to="/shop">Shop</Link>
            {">"}
            <p className="shop-item-tabs-current">{itemContent?.name}</p>
          </div>
        </div>
        <Footer />
        {showArrow && (
          <div className="arrow-container">
            <div
              className="arrow-up"
              onClick={() =>
                window.scroll({ top: 0, left: 0, behavior: "smooth" })
              }
            >
              ▲
            </div>
          </div>
        )}
      </div>
      {modal && <AccountModal />}
    </>
  );
};

export default ShopItem;
