import React from "react";
import styles from "../../Style/Reply.module.css";

export const Reply = ({ username, comment }) => (
  <li className={styles.li}>
    <img
      src="https://bootdey.com/img/Content/user_1.jpg"
      class={styles.avatar}
      alt="Avatar"
    ></img>
    <div className={styles.comment}>
      <p>
        <span className={styles.username}>{username}</span>
        <i className="pull-right"></i>
      </p>
      <hr className={styles.hr}></hr>
      <p>{comment}</p>
    </div>
  </li>
);
