import React from "react";
import styles from "../Style/Button.module.css";

export const Button = ({ buttonText, isDisabled = false, onClickHandler }) => (
  <button
    className={styles.button}
    type="submit"
    disabled={isDisabled}
    onClick={onClickHandler}
  >
    {buttonText}
  </button>
);
