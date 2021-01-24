import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../Input";
import { ErrorModal } from "../ErrorModal";
import axios from "axios";
import styles from "../../Style/Register.module.css";
import { endpoints } from "../../constants";
import { Loading } from "../Loading";

export const Registration = ({ history }) => {
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    first_name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First name",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      errorMessage: "Required field, minimal length 4",
      valid: false,
      touched: false,
    },
    last_name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Last name",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      errorMessage: "Required field, minimal length 4",
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Email",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
        pattern: /(.+)@(.+){2,}\.(.+){2,}/,
      },
      errorMessage: "Required field, email format",
      valid: false,
      touched: false,
    },
    address: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Address",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      errorMessage: "Required field, minimal length 4",
      valid: false,
      touched: false,
    },
    phone: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Phone",
      },
      value: "",
      validation: {
        required: true,
        minLength: 8,
      },
      errorMessage: "Required field, minimal length 9",
      valid: false,
      touched: false,
    },
    job_title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Job title",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      errorMessage: "Required field, minimal length 4",
      valid: false,
      touched: false,
    },
    countries: {
      elementType: "select",
      elementConfig: {
        options: [],
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      errorMessage: "Required",
      valid: false,
      touched: false,
    },
    userTypes: {
      elementType: "select",
      elementConfig: {
        options: [],
        placeholder: "User type",
      },
      value: "",
      validation: {
        required: true,
      },
      errorMessage: "Required",
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 4,
        equals: null,
      },
      errorMessage:
        "Required field, match password confirmation, min 5 characters",
      valid: false,
      touched: false,
    },
    password_confirmation: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password confirm",
      },
      value: "",
      validation: {
        required: true,
        minLength: 4,
        equals: null,
      },
      errorMessage: "Required field, match password",
      valid: false,
      touched: false,
    },
    image: {
      elementType: "input",
      elementConfig: {
        type: "file",
        placeholder: "Photo",
      },
      value: "",
      fileValue: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });
  form.password.validation.equals = form.password_confirmation;
  form.password_confirmation.validation.equals = form.password;

  useEffect(() => {
    axios
      .get(endpoints.countries)
      .then((r) => {
        form.countries.elementConfig.options = r.data.map((x) => {
          return { value: x.id, displayValue: x.name };
        });
      })
      .catch((error) => {
        alert("Something went wrong");
      });
    axios
      .get(endpoints.userTypes)
      .then((r) => {
        form.userTypes.elementConfig.options = r.data.map((x) => {
          return { value: x.id, displayValue: x.type_name };
        });
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }, [form.countries.elementConfig, form.userTypes.elementConfig]);

  const locationButtonHandler = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((x) => {
      let loc = {
        longitude: x.coords.longitude,
        latitude: x.coords.latitude,
      };
      setLocation(loc);
    });
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length > rules.minLength && isValid;
    }

    if (rules.pattern) {
      isValid = rules.pattern.test(value) && isValid;
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

    setFormIsValid(formIsValid);
    setForm(updatedform);
  };

  const postDataHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", form["first_name"].value);
    formData.append("last_name", form["last_name"].value);
    formData.append("email", form["email"].value);
    formData.append("phone", form["phone"].value);
    formData.append("job_title", form["job_title"].value);
    formData.append("address", form["address"].value);
    formData.append("password", form["password"].value);
    formData.append(
      "password_confirmation",
      form["password_confirmation"].value
    );
    formData.append("image", form["image"].fileValue);
    formData.append("country_id", form["countries"].value);
    formData.append("user_type_id", form["userTypes"].value);
    formData.append("longitude", location.longitude);
    formData.append("latitude", location.latitude);

    axios
      .post(endpoints.users, formData)
      .then(() => {
        history.replace("/login");
      })
      .catch((err) => {
        setLoading(false);
        setError("Wrong input, please try again.");
      });
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key],
    });
  }

  return (
    <>
      {error !== "" && <ErrorModal message={error} />}
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.mainDiv}>
          <div className={styles.form}>
            <form onSubmit={postDataHandler}>
              <h3 className={styles.h3}>Register to Komet</h3>
              {formElementsArray.map((el) => (
                <Input
                  key={el.id}
                  elementType={el.config.elementType}
                  elementConfig={el.config.elementConfig}
                  value={el.config.value}
                  invalid={!el.config.valid}
                  shouldValidate={el.config.validation}
                  touched={el.config.touched}
                  errorMessage={el.config.errorMessage}
                  changed={(event) => inputChangedHandler(event, el.id)}
                />
              ))}
              <button className={styles.button} onClick={locationButtonHandler}>
                Access current location
              </button>

              {location.longitude === 0 ? (
                <p className={styles.p}>
                  Please allow location in your browser to insert cordinates.
                </p>
              ) : (
                <p className={styles.p}>
                  Cordinates: latitude: {location.latitude.toFixed(2)},
                  longitude {location.longitude.toFixed(2)}
                </p>
              )}

              {!formIsValid ? (
                <button className={styles.button} type="submit" disabled>
                  Register
                </button>
              ) : (
                <button className={styles.button} type="submit">
                  Register
                </button>
              )}
              <br />
              <p className={styles.p}>
                Already have account,
                <Link to="/login" className={styles.link}>
                  Log in.
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
