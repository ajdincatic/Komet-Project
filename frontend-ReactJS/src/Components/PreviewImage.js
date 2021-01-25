import React from "react";
import styles from "../Style/PreviewImage.module.css";

export const PreviewImage = ({ handleClose, imgPath }) => (
  <div className={styles.mainDiv}>
    <div className={styles.content}>
      <span className={styles.close} onClick={handleClose}>
        &times;
      </span>
      <img className={styles.image} src={imgPath} alt="img" />
    </div>
  </div>
);
