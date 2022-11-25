import React from "react";
import labelStyles from "./label.module.css";

const Label = ({ text }) => {
  return <label className={labelStyles.label}>{text}</label>;
};

export default Label;
