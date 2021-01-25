import React, { useState } from "react";
import { Input } from "../Input";
import axios from "axios";
import { endpoints, reactRoutes } from "../../constants";
import { Link } from "react-router-dom";
import styles from "../../Style/Auth.module.css";

export const SetNewPassword = (props) => {
  const [form, setForm] = useState({
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "New password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 4,
        equals: null,
      },
      valid: false,
      touched: false,
    },
    password_confirmation: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm new password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 4,
        equals: null,
      },
      valid: false,
      touched: false,
    },
  });

  form.password.validation.equals = form.password_confirmation;
  form.password_confirmation.validation.equals = form.password;

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length > rules.minLength && isValid;
    }

    if (rules.equals) {
      isValid = rules.equals.value === value && isValid;
      if (isValid) rules.equals.valid = true;
    }

    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedform = { ...form };
    const updatedFormElement = { ...updatedform[inputIdentifier] };
    if (updatedFormElement.elementConfig.type === "file")
      updatedFormElement.fileValue = event.target.files[0];

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedform[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let key in updatedform) {
      formIsValid = updatedform[key].valid && formIsValid;
    }

    setForm(updatedform);
  };

  const postDataHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let key in form) {
      formData[key] = form[key].value;
    }
    formData["user_id"] = props.match.params.id;
    axios
      .post(endpoints.resetPassword, formData)
      .then(() => {
        props.history.replace(reactRoutes.login);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key],
    });
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.form}>
        <form onSubmit={postDataHandler}>
          <h3 className={styles.h3}>Set new password</h3>

          {formElementsArray.map((el) => {
            return (
              <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => inputChangedHandler(event, el.id)}
              />
            );
          })}

          <button type="submit" className={styles.button}>
            Send
          </button>
          <p className={styles.p}>
            <Link to={reactRoutes.login} className={styles.link}>
              Go back to login.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
