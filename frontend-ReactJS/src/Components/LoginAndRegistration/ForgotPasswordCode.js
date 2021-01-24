import React, { useState } from "react";
import { ErrorModal } from "../ErrorModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints } from "../../constants";
import styles from "../../Style/ForgotPassword.module.css";

export const ForgotPasswordCode = ({ history }) => {
  const [Codeform, CodesetForm] = useState("");

  const inputCode = (event) => CodesetForm(event.target.value);

  const postDataHandler = (e) => {
    e.preventDefault();
    const formData = {
      code: Codeform,
    };
    axios
      .post(endpoints.resetPasswordCode, formData)
      .then((r) => {
        history.replace("/forgotPassword/" + r.data.id + "/newPassword");
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
                value={Codeform}
                onChange={(event) => inputCode(event)}
              ></input>

              {Codeform === "" ? (
                <button className={styles.button} type="submit" disabled>
                  Send
                </button>
              ) : (
                <button className={styles.button} type="submit">
                  Send
                </button>
              )}
              <p className={styles.p}>
                <Link to="/login" className={styles.link}>
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
