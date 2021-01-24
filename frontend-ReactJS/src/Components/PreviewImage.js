import React from "react";
import styles from "../Style/PreviewImage.module.css";

export const PreviewImage = ({ handleClose, path }) => (
  <div className={styles.mainDiv}>
    <div className={styles.content}>
      <span className={styles.close} onClick={handleClose}>
        &times;
      </span>
      <img className={styles.image} src={path} alt="img" />
    </div>
  </div>
);
