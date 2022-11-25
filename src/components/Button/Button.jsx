import React from "react";
import buttonStyles from "./button.module.css";

const Button = ({ text, type, handleClick }) => {
  return (
    <button
      onClick={(e) => handleClick(type)}
      className={buttonStyles.form__button}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
