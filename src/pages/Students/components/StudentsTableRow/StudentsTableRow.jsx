import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

const StudentsTableRow = ({ el, handleAction }) => {
  let {
    id,
    name,
    email,
    phone,
    dni,
    start,
    end,
    status,
    // certificate,
    // birthday,
  } = el;
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{dni}</td>
        <td>{formatDate(new Date(start))}</td>
        <td>{formatDate(new Date(end))}</td>
        <td>{status}</td>
        {/* <td>{certificate}</td> */}
        {/* <td>{birthday}</td> */}
        <td className="table__actions">
          <button
            onClick={() => handleAction("EDIT", el)}
            className="table__icon table__icon--edit"
          >
            <FaEdit />
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
