import "./style.css";
import Footer from "../../components/Footer";
import ShopCards from "../../components/ShopCards";
import { IShop } from "../../interface/shop.interface";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../App";
import AccountModal from "../../components/AccountModal";
import Navbar from "../../components/Navbar";
import { IDbStorage } from "../../interface/dbStorage.interface";
import axios from "axios";
import ReactSlider from "react-slider";
import { useSearchParams } from "react-router-dom";
import AddModal from "../../components/AddModal";

const MIN = 1;
const MAX = 10000;

const Shop: React.FC<IShop> = ({ setShopId }) => {
  const context = useContext(ModalContext);
  const { modal } = context;
  const [showArrow, setShowArrow] = useState<boolean>(false);
  const [dbFilteredGoods, setDbFilteredGoods] = useState<
    IDbStorage[] | undefined
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<{
    min: number;
    max: number;
  }>({
    min: MIN,
    max: MAX,
  });
  const [paramPrice, setParamPrice] = useState<{
    min: number;
    max: number;
  }>();
  const [dbCategories, setDbCategories] =
    useState<{ id: number; description: string; name: string }[]>();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortData, setSortData] = useState<string>();
  const tokenStorage = localStorage.getItem("decodeTokenData");
  const parseToken = tokenStorage && JSON.parse(tokenStorage);
  const [decodeToken, setDecodeToken] = useState<any>(parseToken);
  const [activeAddModal, setActiveAddModal] = useState<boolean>(false);

  const checkScrollHeight = () => {
    setShowArrow(window.scrollY > 150);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/filter`,
        {
          params: {
            min: paramPrice?.min || "",
            max: paramPrice?.max || "",
            categoryId: selectedCategory || "",
            sortBy: sortData || "",
          },
        }
      );
      setDbFilteredGoods(res.data);
      if (!res) return;
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const minPriceChange = (e: any) => {
    setPrice((prev) => ({ ...prev, min: +e.target.value }));
    if (e.target.value.startsWith("0") && e.target.value.length > 1)
      setPrice((prev) => ({ ...prev, min: e.target.value.slice(1) }));
  };

  const maxPriceChange = (e: any) => {
    setPrice((prev) => ({ ...prev, max: +e.target.value }));
    if (e.target.value.startsWith("0") && e.target.value.length > 1)
      setPrice((prev) => ({ ...prev, max: e.target.value.slice(1) }));
  };

  const resetFilters = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/all`
      );
      setDbFilteredGoods(res.data);
      setLoading(false);
    } catch {
      console.log("Error: ");
    }
    setPrice({ min: MIN, max: MAX });
    setSelectedCategory(undefined);
    setParamPrice(undefined);
    setSearchParams({});
  };

  const catchCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/categories/all`
      );
      setDbCategories(res.data);
    } catch {
      console.log("Don't load categories!!!");
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/all`
      );
      setDbFilteredGoods(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const addGoods = () => {};

  useEffect(() => {
    checkScrollHeight();

    window.addEventListener("scroll", checkScrollHeight);

    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, []);

  useEffect(() => {
    const { category, goodsPrice, sortBy } = Object.fromEntries(
      searchParams.entries()
    );

    if (goodsPrice || category || sortBy) {
      const priceArr = goodsPrice?.split("-") || [undefined];
      const priceObj = { min: +priceArr[0], max: +priceArr[1] };

      if (!Number.isNaN(priceObj.min) && !Number.isNaN(priceObj.max)) {
        setParamPrice(priceObj);
      }
      setSelectedCategory(category ? +category : undefined);
      setSortData(sortBy);
    } else {
      fetchAllData();
    }

    if (!searchParams.toString()) {
      fetchAllData();
    }
  }, [searchParams]);

  useEffect(() => {
    if (paramPrice || selectedCategory || sortData) {
      fetchData();
    }
  }, [selectedCategory, paramPrice, sortData]);

  useEffect(() => {
    catchCategories();
    const localToken = localStorage.getItem("decodeTokenData");
    localToken && setDecodeToken(JSON.parse(localToken));
  }, []);

  return (
    <>
      <div className="shop">
        <Navbar setDbFilteredGoods={setDbFilteredGoods} />
        <div className="shop-main">
          <div className="shop-main-left">
            <h1>Catalog</h1>
            <div className="shop-left-container">
              {dbCategories &&
                dbCategories.map((el, ind) => {
                  return (
                    <div
                      key={ind}
                      className="shop-left-container-sort"
                      onClick={() => {
                        if (!searchParams.get("category")) {
                          searchParams.append("category", `${el.id}`);
                        } else {
                          searchParams.set("category", `${el.id}`);
                        }
                        setSearchParams(searchParams);
                      }}
                    >
                      {el.name}
                    </div>
                  );
                })}
              <div className="shop-left-container-price">Price</div>
              {paramPrice && (
                <div className="shop-left-container-select-price">
                  Selected price: {paramPrice.min}-{paramPrice.max}
                </div>
              )}
              <ReactSlider
                onChange={(values) =>
                  setPrice({ min: values[0], max: values[1] })
                }
                value={Object.values(price)}
                min={MIN}
                max={MAX}
              />
              <div className="shop-left-container-sort-price">
                <input
                  id="min-input"
                  type="number"
                  className="shop-left-container-sort-min-price"
                  value={price?.min}
                  onChange={minPriceChange}
                />
                <input
                  type="number"
                  className="shop-left-container-sort-max-price"
                  value={price?.max}
                  onChange={maxPriceChange}
                />
              </div>
              <button
                className="shop-left-container-sort-price-button"
                onClick={() => {
                  if (!searchParams.get("goodsPrice")) {
                    searchParams.append(
                      "goodsPrice",
                      `${price.min}-${price.max}`
                    );
                  } else {
                    searchParams.set("goodsPrice", `${price.min}-${price.max}`);
                  }
                  setSearchParams(searchParams);
                }}
              >
                Set price
              </button>
              <button
                className="shop-left-container-sort-price-button"
                onClick={() => {
                  if (!searchParams.get("sortBy")) {
                    searchParams.append("sortBy", "newest");
                  } else {
                    searchParams.set("sortBy", "newest");
                  }
                  setSearchParams(searchParams);
                }}
              >
                Newest goods
              </button>
              <button
                className="shop-left-container-sort-price-button"
                onClick={() => {
                  if (!searchParams.get("sortBy")) {
                    searchParams.append("sortBy", "oldest");
                  } else {
                    searchParams.set("sortBy", "oldest");
                  }
                  setSearchParams(searchParams);
                }}
              >
                Oldest goods
              </button>
              <button
                className="shop-left-container-sort-price-button"
                onClick={() => {
                  if (!searchParams.get("sortBy")) {
                    searchParams.append("sortBy", "priceAscending");
                  } else {
                    searchParams.set("sortBy", "priceAscending");
                  }
                  setSearchParams(searchParams);
                }}
              >
                Lowest price goods
              </button>
              <button
                className="shop-left-container-sort-price-button"
                onClick={() => {
                  if (!searchParams.get("sortBy")) {
                    searchParams.append("sortBy", "priceDescending");
                  } else {
                    searchParams.set("sortBy", "priceDescending");
                  }
                  setSearchParams(searchParams);
                }}
              >
                Highest price goods
              </button>
              <button
                className="shop-left-container-sort-price-button"
                onClick={resetFilters}
              >
                Reset filters
              </button>
              {decodeToken?.role === "MODERATOR" ||
              decodeToken?.role === "ADMIN" ? (
                <button
                  className="shop-left-container-sort-price-button"
                  onClick={() => setActiveAddModal((prev) => !prev)}
                >
                  Add goods
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="shop-main-right">
            <div className="shop-right-cards">
              {!loading && (
                <ShopCards
                  setShopId={setShopId}
                  dbFilteredGoods={dbFilteredGoods}
                  decodeToken={decodeToken}
                />
              )}
            </div>
          </div>
        </div>
        {document.documentElement.scrollHeight >
        document.documentElement.clientHeight ? (
          <Footer />
        ) : (
          <footer style={{ marginTop: "auto" }}>
            <Footer />
          </footer>
        )}
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
      {activeAddModal && <AddModal setActiveAddModal={setActiveAddModal} />}
    </>
  );
};

export default Shop;
