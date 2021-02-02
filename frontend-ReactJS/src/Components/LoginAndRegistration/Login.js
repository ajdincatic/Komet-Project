import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import styles from "../../Style/Auth.module.css";
import GoogleLogin from "react-google-login";
import { ErrorModal } from "../ErrorModal";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Loading } from "../Loading";
import { Button } from "../Button";
import { Switch } from "../Switch";
import avatar from "../../assets/teeth.png";
import { endpoints, reactRoutes } from "../../constants";

const DARK_CLASS = "dark";

export const Login = () => {
  const [emailForm, setEmailForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const [googleError, setGoogleError] = useState(false);
  const [validationErrorEmail, setValidationErrorEmail] = useState(null);
  const [validationErrorPassword, setValidationErrorPassword] = useState(null);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);

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

  const inputPassword = (event) => {
    const newValue = event.target.value;
    setPasswordForm(newValue);
    if (newValue === "") {
      setValidationErrorPassword(
        <p className={styles.ValidationError}>Required field</p>
      );
    } else setValidationErrorPassword("");
  };

  const postDataHandler = (e) => {
    e.preventDefault();
    const formData = {
      email: emailForm,
      password: passwordForm,
    };
    dispatch(actions.getData(formData, endpoints.login));
  };

  const responseGoogleSuccess = (res) => {
    if (!res.profileObj.familyName)
      res.profileObj.familyName = res.profileObj.givenName;
    dispatch(actions.getData(res.profileObj, endpoints.googleLogin, "GOOGLE"));
  };

  const responseGoogleFail = (res) => {
    // error handling disabled for closing popup by user and incognito window
    if (
      res.error !== "popup_closed_by_user" &&
      res.error !== "idpiframe_initialization_failed"
    )
      setGoogleError(true);
  };

  const handleErrorState = () => setGoogleError(false);

  const handleChangeTheme = () => {
    setIsDark((prevState) => !prevState);
    dispatch(actions.changeTheme(isDark));
  };
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (prefersDark) => {
      setIsDark(prefersDark);
    }
  );

  const [isDark, setIsDark] = useState(
    theme.isDark === null ? systemPrefersDark : theme.isDark
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
    dispatch(actions.changeTheme(isDark));
  }, [isDark, dispatch]);

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
                  value={emailForm}
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
                  value={passwordForm}
                  onChange={(event) => inputPassword(event)}
                ></input>
                {validationErrorPassword}

                <Button
                  buttonText="Login"
                  isDisabled={
                    validationErrorEmail !== "" ||
                    validationErrorPassword !== ""
                  }
                />

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
                <Switch handleChangeTheme={handleChangeTheme} isDark={isDark} />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
