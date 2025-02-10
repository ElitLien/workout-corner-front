import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import GoodsList from "../GoodsList";
import { ModalContext } from "../../App";
import { videos } from "../../const/videos";
import VideosList from "../VideosList";
import axios from "axios";
import { IDbStorage } from "../../interface/dbStorage.interface";

interface FilterVideos {
  setFilteredVideos?: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        title: string;
        time: string;
        src: string;
      }[]
    >
  >;
  setDbFilteredGoods?: React.Dispatch<
    React.SetStateAction<IDbStorage[] | undefined>
  >;
  navSwitch?: boolean;
}

const Navbar: React.FC<FilterVideos> = ({
  setFilteredVideos,
  setDbFilteredGoods,
  navSwitch,
}) => {
  const logo =
    "https://workout-corner.s3.eu-north-1.amazonaws.com/homepage/Frame.png";
  const context = useContext(ModalContext);
  const { switchHandler } = context;
  const [inputValue, setInputValue] = useState("");
  const storage = localStorage.getItem("itemContent");
  const parse = storage && JSON.parse(storage);
  const totalItems = parse
    ? parse.reduce((total: number, item: any) => total + item.amount, 0)
    : 0;
  const [count, setCount] = useState<number>(totalItems);
  const location = useLocation();
  const [enableInput, setEnableInput] = useState<boolean>(false);
  const [focusHander, setFocusHandler] = useState<boolean>(false);
  const [dbStorage, setDbStorage] = useState<IDbStorage[]>();
  const tokenStorage = localStorage.getItem("decodeTokenData");
  const parseToken = tokenStorage && JSON.parse(tokenStorage);
  const [decodeToken, setDecodeToken] = useState<any>(parseToken);
  const timeoutIDRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchResult = () => {
    let result =
      dbStorage &&
      dbStorage.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    return result ? result.slice(0, 3) : [];
  };

  const videosResult = () => {
    let result =
      videos &&
      videos.filter((item) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      );
    return result ? result.slice(0, 3) : [];
  };

  const handleStorageChange = (event: any) => {
    if (event.detail && event.detail.key === "itemContent") {
      const parsedCart = JSON.parse(event.detail.newValue);
      const totalItems = parsedCart.reduce(
        (total: number, item: any) => total + item.amount,
        0
      );
      setCount(totalItems);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnableInput(true);
    setInputValue(e.target.value);
  };

  const keyUpEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let results:
      | {
          id: number;
          title: string;
          time: string;
          src: string;
        }[]
      | {
          id: number;
          createdAt: string;
          description: string;
          image: string;
          name: string;
          price: number;
          categoryId: number;
        }[] = [];

    if (location.pathname === "/videos") {
      results = videos.filter((video) =>
        video.title.toLowerCase().includes(inputValue)
      );
    } else if (location.pathname === "/shop" && dbStorage) {
      results = dbStorage.filter((item) =>
        item.name.toLowerCase().includes(inputValue)
      );
    }

    if (event.key === "Enter") {
      console.log("Without timeout");

      if (location.pathname === "/videos") {
        setFilteredVideos &&
          setFilteredVideos(
            results as {
              id: number;
              title: string;
              time: string;
              src: string;
            }[]
          );
      } else if (location.pathname === "/shop") {
        setDbFilteredGoods &&
          setDbFilteredGoods(
            results as {
              id: number;
              createdAt: string;
              description: string;
              image: string;
              name: string;
              price: number;
              categoryId: number;
            }[]
          );
      }

      setEnableInput(false);
      inputRef.current?.blur();
      if (timeoutIDRef.current) {
        clearTimeout(timeoutIDRef.current);
        timeoutIDRef.current = null;
      }
    } else {
      if (timeoutIDRef.current) {
        clearTimeout(timeoutIDRef.current);
      }
      timeoutIDRef.current = setTimeout(() => {
        console.log("setTimeout: ");
        if (location.pathname === "/videos") {
          setFilteredVideos &&
            setFilteredVideos(
              results as {
                id: number;
                title: string;
                time: string;
                src: string;
              }[]
            );
        } else if (location.pathname === "/shop") {
          setDbFilteredGoods &&
            setDbFilteredGoods(
              results as {
                id: number;
                createdAt: string;
                description: string;
                image: string;
                name: string;
                price: number;
                categoryId: number;
              }[]
            );
        }
      }, 10000);
    }
  };

  useEffect(() => {
    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/all")
      .then((res) => setDbStorage(res.data));
    const localToken = localStorage.getItem("decodeTokenData");
    localToken && setDecodeToken(JSON.parse(localToken));
    console.log("navSwitch: ", navSwitch);
  }, []);

  return (
    <div className="navbar">
      <Link
        to="/"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img src={logo} alt="" />
      </Link>
      {location.pathname === "/shop" || location.pathname === "/videos" ? (
        <div className="navbar-inp">
          <input
            className="navbar-input"
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => onChangeHandler(e)}
            onKeyUp={keyUpEvent}
            onFocus={() => setFocusHandler(true)}
            onBlur={() => setFocusHandler(false)}
            ref={inputRef}
          />
          {inputValue && (
            <div className="navbar-clear" onClick={() => setInputValue("")}>
              X
            </div>
          )}
          {focusHander && (
            <div className="navbar-list">
              {location.pathname === "/shop" && inputValue && enableInput && (
                <GoodsList
                  searchResult={searchResult}
                  setDbFilteredGoods={setDbFilteredGoods}
                  setFocusHandler={setFocusHandler}
                  timeoutIDRef={timeoutIDRef}
                  inputRef={inputRef}
                  setInputValue={setInputValue}
                />
              )}
              {location.pathname === "/videos" && inputValue && enableInput && (
                <VideosList
                  videosResult={videosResult}
                  setFilteredVideos={setFilteredVideos}
                  setFocusHandler={setFocusHandler}
                  timeoutIDRef={timeoutIDRef}
                  inputRef={inputRef}
                  setInputValue={setInputValue}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <div className="navbar-pages">
        <Link
          to="/shop"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Shop{location.pathname === "/shop" && <hr className="line"></hr>}
        </Link>
        <Link
          to="/videos"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Videos{location.pathname === "/videos" && <hr className="line"></hr>}
        </Link>
        <Link
          to="/contact"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Contact
          {location.pathname === "/contact" && <hr className="line"></hr>}
        </Link>
        {decodeToken?.role === "ADMIN" && !navSwitch && (
          <Link
            to="/users"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Users
          </Link>
        )}
        <div onClick={() => switchHandler()} style={{ cursor: "pointer" }}>
          {decodeToken && !navSwitch ? decodeToken.username : "Account"}
        </div>
        <Link
          to="/cart"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Cart{`(${count})`}
          {location.pathname === "/cart" && <hr className="line"></hr>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
