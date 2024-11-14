import { useContext, useState } from "react";
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

  return (
    <>
      <div className="videos">
        <Navbar setFilteredVideos={setFilteredVideos} />
        <div className="videos-main">
          {filteredVideos.map((el, ind) => {
            return <Video key={ind} content={el} />;
          })}
        </div>
        <Footer />
      </div>
      {modal && <AccountModal />}
    </>
  );
};

export default Videos;
