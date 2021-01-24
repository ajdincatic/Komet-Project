import React, { useRef, useState } from "react";
import { ContentHeader } from "../ContentHeader";
import { PreviewImage } from "../PreviewImage";
import Youtube from "react-youtube";
import styles from "../../Style/Medias.module.css";
var getYoutubeId = require("get-youtube-id");

export const Medias = ({ type, data }) => {
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
  const [show, setShow] = useState(false);
  const [path, setPath] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {show && <PreviewImage handleClose={handleClose} path={path} />}

      <ContentHeader title={type === "photo" ? "Photos" : "Videos"} />
      <div className={styles.mainDiv}>
        {data.map((x) => (
          <div className={styles.mediaDiv}>
            {type === "photo" ? (
              <img
                className={styles.image}
                src={"http://komet-intern.qsd.ba" + x.link}
                onClick={() =>
                  handleImageClick("http://komet-intern.qsd.ba" + x.link)
                }
                thumbnail
                alt="alt"
              />
            ) : (
              <div>
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
              </div>
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
