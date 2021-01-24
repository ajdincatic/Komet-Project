import React, { useState, useEffect } from "react";
import axios from "axios";
import { endpoints } from "../../constants";
import { AddMedia } from "./AddMedia";

export const AddVideo = ({ history }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/medias/categories/videos")
      .then((r) => {
        setData(r.data);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }, []);

  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Title",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    categories: {
      elementType: "select",
      elementConfig: {
        options: [],
        placeholder: "Category",
      },
      validation: {
        required: true,
      },
      value: "",
      valid: false,
    },
    url: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "URL",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
        pattern: new RegExp(
          "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ),
      },
      valid: false,
      touched: false,
    },
  });

  form.categories.elementConfig.options = data.map((x) => {
    return { value: x.id, displayValue: x.title };
  });

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

    return isValid;
  };

  const postDataHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let key in form) {
      if (key === "categories") {
        formData["category_id"] = form[key].value;
        continue;
      }
      formData[key] = form[key].value;
    }
    axios
      .post(endpoints.videos, formData)
      .then(() => {
        history.replace("/allVideos");
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  return (
    <AddMedia
      type="video"
      form={form}
      formIsValid={formIsValid}
      handler={postDataHandler}
      inputChangedHandler={inputChangedHandler}
    />
  );
};
