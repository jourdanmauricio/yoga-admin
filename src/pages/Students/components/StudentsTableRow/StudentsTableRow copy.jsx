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

const StudentsTableRow = ({ el, setDataToEdit, deleteData }) => {
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
        <td className="lessons__actions">
          <button
            onClick={() => setDataToEdit(el)}
            className="lesson__icon lesson__icon--edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteData(el)}
            className="lesson__icon lesson__icon--delete"
          >
            <FaRegTrashAlt />
          </button>
        </td>
      </tr>
    </>
  );
};

export default StudentsTableRow;
