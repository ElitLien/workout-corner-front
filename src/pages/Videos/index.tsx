import { useContext, useEffect, useState } from "react";
import "./style.css";
import { ModalContext } from "../../App";
import AccountModal from "../../components/AccountModal";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Video from "../../components/Video";
import { videos } from "../../const/videos";

const Videos = () => {
  const context = useContext(ModalContext);
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const { modal } = context;
  const [showArrow, setShowArrow] = useState<boolean>(false);

  const checkScrollHeight = () => {
    setShowArrow(window.scrollY > 150);
  };

  useEffect(() => {
    checkScrollHeight();

    window.addEventListener("scroll", checkScrollHeight);

    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, []);

  return (
    <>
      <div className="videos">
        <Navbar setFilteredVideos={setFilteredVideos} />
        {filteredVideos.length ? (
          <div className="videos-main">
            {filteredVideos.map((el, ind) => {
              return <Video key={ind} content={el} />;
            })}
          </div>
        ) : (
          <div className="videos-empty">Don't found any video</div>
        )}
        <Footer />
      </div>
      {modal && <AccountModal />}
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
    </>
  );
};

export default Videos;
