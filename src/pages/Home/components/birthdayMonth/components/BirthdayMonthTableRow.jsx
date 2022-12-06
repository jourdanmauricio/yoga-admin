import React from "react";
import { getBirthday } from "@/helpers/helpFunctions";

const BirthdayMonthTableRow = ({ el }) => {
  let { name, email, age, birthday } = el;
  return (
    <tr>
      <td data-titulo="Nombre">{name}</td>
      <td data-titulo="Email">{email}</td>
      <td data-titulo="Edad">{age}</td>
      <td data-titulo="Cumpleaños">{getBirthday(birthday)}</td>
    </tr>
  );
};

export default BirthdayMonthTableRow;
