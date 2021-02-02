import React, { useRef, useState } from "react";
import { ContentHeader } from "../ContentHeader";
import { PreviewImage } from "../PreviewImage";
import { apiURL } from "../../constants";
import Youtube from "react-youtube";
import styles from "../../Style/Medias.module.css";
var getYoutubeId = require("get-youtube-id");

export const Medias = ({ type, data }) => {
  const [show, setShow] = useState(false);
  const [path, setPath] = useState();

  const handleOnVideoPlay = (event) => {
    videos.current.forEach((element) => {
      event.target.h.id !== element.props.id &&
        element.internalPlayer.pauseVideo();
    });
  };

  const videos = useRef([]);

  const handleImageClick = (path) => {
    setPath(path);
    handleShow();
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {show && <PreviewImage handleClose={handleClose} imgPath={path} />}
      <ContentHeader title={type === "photo" ? "Photos" : "Videos"} />
      <div className={styles.mainDiv}>
        {data.map((x) => (
          <div className={styles.mediaDiv}>
            {type === "photo" ? (
              <img
                className={styles.image}
                src={apiURL + x.link}
                onClick={() => handleImageClick(apiURL + x.link)}
                thumbnail
                alt="alt"
              />
            ) : (
              <Youtube
                className={styles.video}
                id={getYoutubeId(x.link)}
                ref={(el) => videos.current.push(el)}
                videoId={getYoutubeId(x.link)}
                opts={{
                  height: "250",
                  width: "400",
                }}
                onPlay={(e) => handleOnVideoPlay(e)}
              />
            )}
            <p>
              Title: {x.title}({x.media_category_name})
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
