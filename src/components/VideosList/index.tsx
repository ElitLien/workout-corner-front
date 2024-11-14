import "./style.css";
import { videos } from "../../const/videos";
import { IVideosList } from "../../interface/videosList.interface";

const VideosList: React.FC<IVideosList> = ({ videosResult }) => {
  return (
    <>
      {videos &&
        videosResult().map((el, ind) => {
          return (
            <div className="goods" key={ind}>
              {el.title}
            </div>
          );
        })}
    </>
  );
};

export default VideosList;
