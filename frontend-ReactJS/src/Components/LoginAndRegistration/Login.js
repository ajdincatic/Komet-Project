import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import styles from "../../Style/Auth.module.css";
import GoogleLogin from "react-google-login";
import { ErrorModal } from "../ErrorModal";
import { Link } from "react-router-dom";
import { Loading } from "../Loading";
import avatar from "../../assets/teeth.png";
import { endpoints, reactRoutes } from "../../constants";

export const Login = () => {
  const dispatch = useDispatch();
  const [Emailform, EmailsetForm] = useState("");
  const [Passwordform, PasswordsetForm] = useState("");
  const data = useSelector((state) => state.auth);

  const inputEmail = (event) => EmailsetForm(event.target.value);
  const inputPassword = (event) => PasswordsetForm(event.target.value);

  const [validationErrorEmail, setvalidationErrorEmail] = useState(null);
  const [validationErrorPassword, setvalidationErrorPassword] = useState(null);

  const postDataHandler = (e) => {
    e.preventDefault();
    let pattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if (Emailform === "" || !pattern.test(Emailform)) {
      setvalidationErrorEmail(
        <p className={styles.ValidationError}>Required, email format</p>
      );
      return;
    } else if (Passwordform === "") {
      setvalidationErrorPassword(
        <p className={styles.ValidationError}>Required</p>
      );
      return;
    }
    const formData = {
      email: Emailform,
      password: Passwordform,
    };
    dispatch(actions.getData(formData, endpoints.login));
  };

  const responseGoogleSuccess = (res) => {
    if (!res.profileObj.familyName)
      res.profileObj.familyName = res.profileObj.givenName;
    dispatch(actions.getData(res.profileObj, endpoints.googleLogin, "GOOGLE"));
  };

  const responseGoogleFail = (res) => setgoogleError(true);

  const [googleError, setgoogleError] = useState(false);
  const handleErrorState = () => setgoogleError(false);

  return (
    <>
      {data.error !== "" && (
        <ErrorModal
          message={data.error}
          dispatch={dispatch}
          action={actions.disableErrorData}
        />
      )}
      {googleError && (
        <ErrorModal
          message="Can not sign in using google."
          handleErrorState={handleErrorState}
        />
      )}
      {data.loading ? (
        <Loading />
      ) : (
        <div className={styles.mainDiv}>
          <div className={styles.form}>
            <form onSubmit={postDataHandler}>
              <div className={styles.imgContainer}>
                <img src={avatar} alt="Avatar" className={styles.avatar}></img>
              </div>
              <h3 className={styles.h3}>Welcome to Komet</h3>

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

                <label>
                  <b>Password</b>
                </label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Enter Password"
                  value={Passwordform}
                  onChange={(event) => inputPassword(event)}
                ></input>

                {validationErrorPassword}

                {Emailform === "" || Passwordform === "" ? (
                  <button className={styles.button} type="submit" disabled>
                    Login
                  </button>
                ) : (
                  <button className={styles.button} type="submit">
                    Login
                  </button>
                )}
                <GoogleLogin
                  className={styles.googleButton}
                  clientId="527689655395-backu7t2bf8i3fhp2mvcpq4nlo9c298m.apps.googleusercontent.com"
                  onSuccess={responseGoogleSuccess}
                  onFailure={responseGoogleFail}
                  cookiePolicy={"single_host_origin"}
                />
              </div>

              <div className={styles.footer}>
                <Link to={reactRoutes.register}>
                  <p className={styles.p}>Register now!</p>
                </Link>
                <hr />
                <Link to={reactRoutes.forgotPassword}>
                  <p className={styles.p}>Forgot password?</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
