import React from "react";
import styles from "../Style/PreviewImage.module.css";

export const PreviewImage = ({ handleClose, imgPath }) => (
  <div className={styles.wrapper}>
    <div className={styles.backdrop} onClick={handleClose}></div>
    <div className={styles.mainDiv}>
      <span className={styles.close} onClick={handleClose}>
        &times;
      </span>
      <div className={styles.content}>
        <img className={styles.image} src={imgPath} alt="img" />
      </div>
    </div>
  </div>
);
