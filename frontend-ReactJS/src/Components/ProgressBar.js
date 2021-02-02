import React from "react";
import styles from "../Style/ProgressBar.module.css";

export const ProgressBar = ({ progress }) => (
  <div className={styles.mainDiv}>
    <div className={styles.progress} style={{ width: `${progress}%` }}>
      <span className={styles.text}>{progress}%</span>
    </div>
  </div>
);
