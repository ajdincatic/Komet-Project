import React from "react";
import styles from "../Style/Switch.module.css";

export const Switch = ({ handleChangeTheme, isDark }) => (
  <label className={styles.switch}>
    <input
      onClick={handleChangeTheme}
      className={styles.input}
      type="checkbox"
      checked={isDark}
    ></input>
    <span className={`${styles.slider} ${styles.round}`}></span>
  </label>
);
