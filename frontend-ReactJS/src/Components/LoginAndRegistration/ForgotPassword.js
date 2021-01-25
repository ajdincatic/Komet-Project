import React, { useState } from "react";
import { ErrorModal } from "../ErrorModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints, reactRoutes } from "../../constants";
import styles from "../../Style/Auth.module.css";

export const ForgotPassword = ({ history }) => {
  const [Emailform, EmailsetForm] = useState("");

  const inputEmail = (event) => EmailsetForm(event.target.value);

  const [validationErrorEmail, setvalidationErrorEmail] = useState(null);

  const postDataHandler = (e) => {
    e.preventDefault();
    let pattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if (Emailform === "" || !pattern.test(Emailform)) {
      setvalidationErrorEmail(
        <p className={styles.ValidationError}>Required, email format</p>
      );
      return;
    }
    const formData = {
      email: Emailform,
    };
    axios
      .post(endpoints.resetPasswordEmail, formData)
      .then((r) => {
        history.replace(reactRoutes.forgotPasswordCode);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const [error, setError] = useState(false);
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
                value={Emailform}
                onChange={(event) => inputEmail(event)}
              ></input>
              {validationErrorEmail}

              {Emailform === "" ? (
                <button className={styles.button} type="submit" disabled>
                  Send
                </button>
              ) : (
                <button className={styles.button} type="submit">
                  Send
                </button>
              )}

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
