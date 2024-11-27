import "./style.css";
import { videos } from "../../const/videos";
import { IVideosList } from "../../interface/videosList.interface";

const VideosList: React.FC<IVideosList> = ({
  videosResult,
  setFilteredVideos,
  setFocusHandler,
  timeoutIDRef,
  inputRef,
  setInputValue,
}) => {
  const clickHandler = (
    el: {
      id: number;
      title: string;
      time: string;
      src: string;
    },
    event?: any
  ) => {
    setInputValue && setInputValue(el.title);
    setFilteredVideos && setFilteredVideos([el]);
    setFocusHandler && setFocusHandler(false);
    inputRef?.current && inputRef.current.blur();
    if (timeoutIDRef?.current) {
      clearTimeout(timeoutIDRef.current);
      timeoutIDRef.current = null;
    }
  };

  return (
    <>
      {videos &&
        videosResult &&
        videosResult().map((el, ind) => {
          return (
            <div
              className="goods"
              key={ind}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                clickHandler(el);
              }}
            >
              {el.title}
            </div>
          );
        })}
    </>
  );
};

export default VideosList;
