import React from "react";
import { Link } from "react-router-dom";
import styles from "../Style/ContentHeader.module.css";

export const ContentHeader = ({ title, actionRoute, buttonText }) => (
  <div className={styles.mainDiv}>
    <h2 className={styles.h2}>{title}</h2>
    {actionRoute && (
      <Link to={actionRoute} className={styles.link}>
        <button className={styles.button}>{buttonText ?? "Add new"}</button>
      </Link>
    )}
  </div>
);
