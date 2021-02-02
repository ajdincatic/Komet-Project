import React from "react";
import { Header } from "./Header";
import styles from "../../Style/Content.module.css";

export const Content = ({
  sidebarToogle,
  handler,
  children,
  handleChangeTheme,
  isDark,
}) => (
  <div className={`${styles.content} ${!sidebarToogle && styles.nonActive}`}>
    <Header
      handler={handler}
      handleChangeTheme={handleChangeTheme}
      isDark={isDark}
    />
    <div className={styles.container}>{children}</div>
  </div>
);
