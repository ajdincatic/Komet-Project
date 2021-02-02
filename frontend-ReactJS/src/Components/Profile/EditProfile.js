import React, { useEffect, useState } from "react";
import { ContentHeader } from "../ContentHeader";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { endpoints, reactRoutes, apiURL } from "../../constants";
import { Input } from "../Input";
import styles from "../../Style/Profile.module.css";
import * as actions from "../../store/actions/index";

export const EditProfile = ({ history }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);
  const data = useSelector((state) => state.auth.authUser.user);
  const [imagePath, setImagePath] = useState(apiURL + data.photo_path);
  const [form, setForm] = useState({
    first_name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First name",
      },
      value: data.first_name,
      validation: {
        required: true,
        minLength: 3,
      },
      valid: true,
      touched: false,
    },
    last_name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Last name",
      },
      value: data.last_name,
      validation: {
        required: true,
        minLength: 3,
      },
      valid: true,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Email",
      },
      value: data.email,
      validation: {
        required: true,
        minLength: 3,
      },
      valid: true,
      touched: false,
    },
    phone: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Phone number",
      },
      value: data.phone,
      validation: {
        required: true,
        minLength: 8,
      },
      valid: true,
      touched: false,
    },
    address: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Address",
      },
      value: data.address,
      validation: {
        required: true,
        minLength: 3,
      },
      valid: true,
      touched: false,
    },
    job_title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Job title",
      },
      value: data.job_title,
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    countries: {
      elementType: "select",
      elementConfig: {
        options: [],
        placeholder: "Country",
      },
      value: data.country_id,
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    image: {
      elementType: "input",
      elementConfig: {
        type: "file",
        placeholder: "New photo",
      },
      value: "",
      fileValue: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
  });

  form.countries.elementConfig.options = countriesData.map((x) => {
    return { value: x.id, displayValue: x.name };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(endpoints.countries)
      .then((r) => {
        setCountriesData(r.data);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }, []);

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
    if (updatedFormElement.elementConfig.type === "file") {
      updatedFormElement.fileValue = event.target.files[0];
      if (event.target.files.length > 0)
        setImagePath(URL.createObjectURL(event.target.files[0]));
      else setImagePath(apiURL + data.photo_path);
    }

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
    formData.append("first_name", form["first_name"].value);
    formData.append("last_name", form["last_name"].value);
    formData.append("email", form["email"].value);
    formData.append("phone", form["phone"].value);
    formData.append("address", form["address"].value);
    formData.append("job_title", form["job_title"].value);
    formData.append("country_id", form["countries"].value);
    form["image"].fileValue !== "" &&
      formData.append("image", form["image"].fileValue);
    formData.append("user_type_id", data.user_type_id);

    axios
      .post("/profile/" + data.id + "/updateProfile", formData)
      .then(() => {
        dispatch(actions.getProfileData());
        history.replace(reactRoutes.profile);
      })
      .catch(() => {
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
      <ContentHeader
        title="Edit profile"
        actionRoute={reactRoutes.updatePassword}
        buttonText="Update password"
      />
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
        <br></br>
        <img src={imagePath} alt="Admin" className={styles.editImg}></img>
        <br></br>
        <br></br>
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
