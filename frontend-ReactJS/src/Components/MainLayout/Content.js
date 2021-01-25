import React from "react";
import { Header } from "./Header";
import styles from "../../Style/Content.module.css";

export const Content = ({ isActive, handler, children }) => (
  <div
    className={`${styles.content} ${
      isActive ? styles.active : styles.nonActive
    }`}
  >
    <Header handler={handler} />
    <div className={styles.container}>{children}</div>
  </div>
);
