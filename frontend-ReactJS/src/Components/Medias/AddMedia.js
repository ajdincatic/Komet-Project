import React from "react";
import { ContentHeader } from "../ContentHeader";
import { Input } from "../Input";

export const AddMedia = ({
  form,
  type,
  handler,
  inputChangedHandler,
  formIsValid,
}) => {
  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key],
    });
  }

  return (
    <>
      <ContentHeader title={type === "photo" ? "Add a photo" : "Add a video"} />
      <form onSubmit={handler}>
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
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
