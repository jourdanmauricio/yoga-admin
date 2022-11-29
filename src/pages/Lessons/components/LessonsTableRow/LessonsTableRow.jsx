import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const LessonsTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { id, days, hours } = el;
  return (
    <>
      <tr>
        <td data-titulo="Días">{days}</td>
        <td data-titulo="Horario">{hours}</td>
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

export default LessonsTableRow;
