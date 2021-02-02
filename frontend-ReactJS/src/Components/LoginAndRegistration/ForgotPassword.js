import React, { useState } from "react";
import { ErrorModal } from "../ErrorModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints, reactRoutes } from "../../constants";
import { Button } from "../Button";
import styles from "../../Style/Auth.module.css";

export const ForgotPassword = ({ history }) => {
  const [emailForm, setEmailForm] = useState("");
  const [validationErrorEmail, setValidationErrorEmail] = useState(null);
  const [error, setError] = useState(false);

  const inputEmail = (event) => {
    const newValue = event.target.value;
    setEmailForm(newValue);
    const pattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if (newValue === "" && !pattern.test(newValue)) {
      setValidationErrorEmail(
        <p className={styles.ValidationError}>Required field, email format</p>
      );
    } else if (!pattern.test(newValue)) {
      setValidationErrorEmail(
        <p className={styles.ValidationError}>Email format</p>
      );
    } else setValidationErrorEmail("");
  };

  const postDataHandler = (e) => {
    e.preventDefault();
    const formData = {
      email: emailForm,
    };
    axios
      .post(endpoints.resetPasswordEmail, formData)
      .then((r) => {
        history.replace(reactRoutes.forgotPasswordCode);
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleErrorState = () => setError(false);

  return (
    <>
      {error && (
        <ErrorModal
          message="Email not exists."
          handleErrorState={handleErrorState}
        />
      )}
      <div className={styles.mainDiv}>
        <div className={styles.form}>
          <form onSubmit={postDataHandler}>
            <h3 className={styles.h3}>
              Insert your email to get code for resetting password
            </h3>

            <div>
              <label>
                <b>Email</b>
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter Email"
                value={emailForm}
                onChange={(event) => inputEmail(event)}
              ></input>
              {validationErrorEmail}

              <Button
                buttonText="Send"
                isDisabled={validationErrorEmail !== ""}
              />

              <p className={styles.p}>
                <Link to={reactRoutes.login} className={styles.link}>
                  Go back to login.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
