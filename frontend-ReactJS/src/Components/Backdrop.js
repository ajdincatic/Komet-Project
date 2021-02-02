import React from "react";
import styles from "../Style/Backdrop.module.css";

export const Backdrop = ({ show, clickEvent }) =>
  window.innerWidth <= 900 &&
  show && <div className={styles.backdrop} onClick={clickEvent}></div>;
