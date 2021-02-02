import React from "react";
import styles from "../Style/Modal.module.css";

export const ErrorModal = ({ dispatch, action, handleErrorState, message }) => {
  const handleClose = () => {
    dispatch && dispatch(action());
    handleErrorState && handleErrorState();
    action && action(false);
  };

  return (
    <div className={styles.bg}>
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
        </div>
      </div>
    </div>
  );
};
