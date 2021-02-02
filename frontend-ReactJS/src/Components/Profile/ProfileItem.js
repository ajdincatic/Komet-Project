import React from "react";
import styles from "../../Style/Profile.module.css";

export const ProfileItem = ({ label, data }) => (
  <>
    <div className={styles.el}>
      <h6 className={styles.h6}>{label}</h6>
      <p className={styles.p}>{data}</p>
    </div>
    <hr />
  </>
);
