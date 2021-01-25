import React, { useState } from "react";
import { ContentHeader } from "../ContentHeader";
import { ErrorModal } from "../ErrorModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { Input } from "../Input";

export const UpdatePassword = ({ history }) => {
  const data = useSelector((state) => state.auth.authUser.user);

  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    current_password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Current password",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
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

    setFormIsValid(formIsValid);
    setForm(updatedform);
  };

  const postDataHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let key in form) {
      formData[key] = form[key].value;
    }
    axios
      .post("/profile/" + data.id + "/updatePassword", formData)
      .then(() => {
        history.replace("/profile");
      })
      .catch((error) => {
        setError(true);
      });
  };

  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key],
    });
  }

  const [error, setError] = useState(false);
  const handleErrorState = () => setError(false);

  return (
    <>
      {error && (
        <ErrorModal
          message="Something went wrong. Please try again."
          handleErrorState={handleErrorState}
        />
      )}
      <ContentHeader title="Update password" />
      <form onSubmit={postDataHandler}>
        {formElementsArray.map((el) => (
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
        ))}
        {!formIsValid ? (
          <button disabled variant="primary" type="submit">
            Submit
          </button>
        ) : (
          <button variant="primary" type="submit">
            Submit
          </button>
        )}
      </form>
    </>
  );
};
