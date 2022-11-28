import React from "react";
import Label from "../Label/Label";
import inputStyles from "./input.module.css";

const Input = ({ attribute, handleChange, error }) => {
  console.log("!!", attribute.max);
  return (
    <div className={inputStyles.form__group}>
      <Label text={attribute.label} />
      <input
        id={attribute.id}
        name={attribute.name}
        min={attribute.min}
        max={attribute.max}
        placeholder={attribute.placeholder}
        type={attribute.type}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className={`${inputStyles.input} ${error && inputStyles.input__error}`}
        // className={!error ? inputStyles.input : inputStyles.input inputStyles.input__error}
        value={attribute.value}
      />
      {/* <label className={`msg ${error && "msg-error"}`}>{error}</label> */}
      <label
        className={`${inputStyles.msg} ${error && inputStyles.msg__error}`}
      >
        {error}
      </label>
    </div>
  );
};

export default Input;
