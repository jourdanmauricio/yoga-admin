import React from "react";
import { FaEdit, FaRegTrashAlt, FaRegEye } from "react-icons/fa";
// import { formatDateTable } from "@/helpers/helpFunctions";

const StudentsTableRow = ({ el, handleAction }) => {
  let { id, name, email, phone, dni, status } = el;
  return (
    <>
      <tr>
        <td data-titulo="Nombre">{name}</td>
        <td data-titulo="Email">{email}</td>
        <td data-titulo="Teléfono">{phone}</td>
        <td data-titulo="DNI">{dni}</td>
        <td data-titulo="Estado">{status}</td>
        <td className="table__actions">
          <button
            onClick={() => handleAction("EDIT", el)}
            className="table__icon table__icon--edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleAction("VIEW", el)}
            className="table__icon table__icon--edit"
          >
            <FaRegEye />
          </button>
          <button
            onClick={() => handleAction("DELETE", el)}
            className="table__icon table__icon--delete"
          >
            <FaRegTrashAlt />
          </button>
        </td>
      </tr>
    </>
  );
};

export default StudentsTableRow;
