import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const UsersTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { id, email, role } = el;
  return (
    <>
      <tr>
        <td data-titulo="Email">{email}</td>
        <td data-titulo="Role">{role}</td>
        <td className="table__actions">
          <button
            onClick={() => setDataToEdit(el)}
            className="table__icon table__icon--edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteData(el)}
            className="table__icon table__icon--delete"
          >
            <FaRegTrashAlt />
          </button>
        </td>
      </tr>
    </>
  );
};

export default UsersTableRow;
