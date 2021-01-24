import React from "react";
import styles from "../Style/Input.module.css";

export const Input = ({
  invalid,
  shouldValidate,
  touched,
  errorMessage,
  elementType,
  elementConfig,
  value,
  changed,
}) => {
  let inputElement = null;
  let validationError = null;

  let invalidClass = null;
  if (invalid && shouldValidate && touched) {
    invalidClass = styles.invalid;
    validationError = <p className={styles.ValidationError}>{errorMessage}</p>;
  }

  switch (elementType) {
    case "input": {
      inputElement = (
        <input
          className={styles.input + " " + invalidClass}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    }
    case "textarea": {
      inputElement = (
        <textarea
          className={styles.textarea + " " + invalidClass}
          row={3}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    }
    case "select": {
      inputElement = (
        <select
          onChange={changed}
          className={styles.input + " " + invalidClass}
        >
          <option value="" selected disabled>
            -- Select {elementConfig.placeholder} --
          </option>
          {elementConfig.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    }
    default:
      break;
  }

  return (
    <>
      <lable>{elementConfig.placeholder}</lable>
      <div>{inputElement}</div>
      {validationError}
    </>
  );
};
