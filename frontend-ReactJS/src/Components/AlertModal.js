import React from "react";
import styles from "../Style/Modal.module.css";

export const AlertModal = ({ message, handleClose, handleLogout }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <span className={styles.close} onClick={handleClose}>
        &times;
      </span>
      <h3 className={styles.h3}>Alert</h3>
      <hr />
      <br />
      <div>{message}</div>
      <br />
      <div className={styles.buttonGroup}>
        <button className={styles.cancelButton} onClick={handleClose}>
          Cancel
        </button>
        {handleLogout && (
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  </div>
);
