import React from "react";
import { Header } from "./Header";
import styles from "../../Style/Content.module.css";

export const Content = ({ isActive, handler, children }) => {
  const active = isActive ? styles.active : styles.nonActive;
  return (
    <div className={styles.content + " " + active}>
      <Header handler={handler} />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
