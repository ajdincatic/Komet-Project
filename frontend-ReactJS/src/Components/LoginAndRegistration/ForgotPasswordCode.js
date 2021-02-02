import React, { useState } from "react";
import { ErrorModal } from "../ErrorModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints, reactRoutes } from "../../constants";
import styles from "../../Style/Auth.module.css";
import { Button } from "../Button";

export const ForgotPasswordCode = ({ history }) => {
  const [codeForm, setCodeForm] = useState("");
  const [error, setError] = useState(false);

  const inputCode = (event) => setCodeForm(event.target.value);

  const postDataHandler = (e) => {
    e.preventDefault();
    const formData = {
      code: codeForm,
    };
    axios
      .post(endpoints.resetPasswordCode, formData)
      .then((r) => {
        history.replace("/forgotPassword/" + r.data.id + "/newPassword");
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
          message="Code not exists."
          handleErrorState={handleErrorState}
        />
      )}
      <div className={styles.mainDiv}>
        <div className={styles.form}>
          <form onSubmit={postDataHandler}>
            <h3 className={styles.h3}>Insert code from your email.</h3>

            <div>
              <label>
                <b>Code</b>
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter Code"
                value={codeForm}
                onChange={(event) => inputCode(event)}
              ></input>

              <Button buttonText="Send" isDisabled={codeForm === ""} />

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
