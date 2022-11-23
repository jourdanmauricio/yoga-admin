import React from "react";
import Label from "../Label/label";
import "./input.css";

const Input = ({ attribute, handleChange, error }) => {
  return (
    <div className="form__group">
      <Label text={attribute.label} />
      <input
        id={attribute.id}
        name={attribute.name}
        placeholder={attribute.placeholder}
        type={attribute.type}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className={!error ? "input" : "input input__error"}
      />
      <label className={`msg ${error && "msg-error"}`}>{error}</label>
    </div>
  );
};

export default Input;
