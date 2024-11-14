import React from "react";
import "./style.css";
import { IVideo } from "../../interface/video.interface";

const Video: React.FC<IVideo> = ({ content }) => {
  return (
    <div className="videos-main-video">
      <div className="videos-main-video-player">
        <iframe
          src={content.src}
          title="*"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
        <div className="videos-main-video-player-time">{content.time}</div>
      </div>
      <div className="videos-main-video-title">{content.title}</div>
    </div>
  );
};

export default Video;
