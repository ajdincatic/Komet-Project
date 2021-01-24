import React, { useEffect, useState } from "react";
import { ContentHeader } from "../ContentHeader";
import axios from "axios";
import { endpoints } from "../../constants";
import { Input } from "../Input";

export const AddNotification = ({ history }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(endpoints.userTypes)
      .then((r) => {
        let result = r.data.filter((x) => x.type_name !== "Administrator");
        setData(result);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }, []);

  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    topic: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Topic",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    message: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Message",
      },
      value: "",
      validation: {
        required: true,
        minLength: 10,
      },
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

  form.userTypes.elementConfig.options = data.map((x) => {
    return { value: x.id, displayValue: x.type_name };
  });
  form.userTypes.elementConfig.options.unshift({
    value: 0,
    displayValue: "All",
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
    const formData = new FormData();
    formData.append("image", form["image"].fileValue);
    formData.append("topic", form["topic"].value);
    formData.append("message", form["message"].value);
    if (form["userTypes"].value !== "0")
      formData.append("user_type_id", form["userTypes"].value);

    axios
      .post("/notifications", formData)
      .then(() => {
        history.replace("/notifications");
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
      <ContentHeader title="Send notification" />
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
