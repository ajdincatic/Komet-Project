import React, { useState } from "react";
import axios from "axios";
import { Input } from "../Input";
import * as actions from "../../store/actions/index";
import { endpoints } from "../../constants";
import { useSelector } from "react-redux";

export const AddSubfolder = ({ dispatch, newsTypeId }) => {
  const data = useSelector((state) => state.auth);

  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Add new subfolder",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
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
    formData.news_type_id = newsTypeId;
    let loggedUserId = data.authUser.user.id;
    formData.creator_id = loggedUserId;
    axios
      .post(endpoints.newsSubfolders, formData)
      .then((r) => {
        formData.id = r.data.id;
        dispatch(actions.addNewsSubfolder(formData));
        const baseState = Object.assign({}, form.title);
        baseState["value"] = "";
        setForm({ baseState });
        dispatch(actions.getNewsSubfolders(newsTypeId));
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
    <>
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
