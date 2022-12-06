import React from "react";
import { formatDateTable } from "@/helpers/helpFunctions";

const NoCertificateTableRow = ({ el }) => {
  let { name, email, age, createdAt } = el;
  return (
    <tr>
      <td data-titulo="Nombre">{name}</td>
      <td data-titulo="Email">{email}</td>
      <td data-titulo="Edad">{age}</td>
      <td data-titulo="Fecha de alta">{formatDateTable(createdAt)}</td>
    </tr>
  );
};

export default NoCertificateTableRow;
