import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import GoodsList from "../GoodsList";
import { ModalContext } from "../../App";
import { cardsInfo } from "../../const/cardsInfo";
import { videos } from "../../const/videos";
import VideosList from "../VideosList";

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
}

const Navbar: React.FC<FilterVideos> = ({ setFilteredVideos }) => {
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

  const searchResult = () => {
    let result =
      cardsInfo &&
      cardsInfo.filter((item) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
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
    const results = videos.filter((video) =>
      video.title.toLowerCase().includes(inputValue)
    );

    switch (event.key) {
      case "Enter":
        console.log("Without timeout");
        setFilteredVideos && setFilteredVideos(results);
        setEnableInput(false);
        event.currentTarget.blur();
        break;
      default:
        setTimeout(() => {
          console.log("setTimeout: ");
          setFilteredVideos && setFilteredVideos(results);
        }, 10000);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log("Search: ", count);
  }, [count]);

  return (
    <div className="navbar">
      <Link to="/">
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
          />
          <div className="navbar-list">
            {location.pathname === "/shop" && inputValue && enableInput && (
              <GoodsList searchResult={searchResult} />
            )}
            {location.pathname === "/videos" && inputValue && enableInput && (
              <VideosList videosResult={videosResult} />
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="navbar-pages">
        <Link to="/shop">Shop</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/contact">Contact</Link>
        <div onClick={() => switchHandler()} style={{ cursor: "pointer" }}>
          Account
        </div>
        <Link to="/cart">Cart{`(${count})`}</Link>
      </div>
    </div>
  );
};

export default Navbar;
