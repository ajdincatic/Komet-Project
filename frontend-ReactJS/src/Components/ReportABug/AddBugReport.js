import React, { useState } from "react";
import { ContentHeader } from "../ContentHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import { AlertModal } from "../AlertModal";
import { endpoints, reactRoutes } from "../../constants";
import { Input } from "../Input";

export const AddBugReport = ({ history }) => {
  const data = useSelector((state) => state.auth);

  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    message: {
      elementType: "textarea",
      elementConfig: {
        type: "textarea",
        placeholder: "Message",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 100,
      },
      valid: false,
      touched: false,
    },
  });

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length > rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length < rules.maxLength && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedform = { ...form };
    const updatedFormElement = { ...updatedform[inputIdentifier] };
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
    let loggedUserId = data.authUser.user.id;
    formData.user_creator_id = loggedUserId;
    axios
      .post(endpoints.reportedBugs, formData)
      .then(() => {
        handleShow();
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

  const [show, setShow] = useState(false);
  const handleClose = () => history.replace(reactRoutes.dashboard);
  const handleShow = () => setShow(true);

  return (
    <>
      {show && (
        <AlertModal
          message="Bug report successfully addeed."
          handleClose={handleClose}
        />
      )}
      <ContentHeader title="Add new bug report" />
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
          <button disabled type="submit">
            Submit
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </>
  );
};
