import React from "react";
import "./lessonsTableRow.css";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const LessonsTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { id, days, hours } = el;
  return (
    <>
      <tr>
        <td>{days}</td>
        <td>{hours}</td>
        <td className="lessons__actions">
          <button
            onClick={() => setDataToEdit(el)}
            className="lesson__icon lesson__icon--edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteData(id)}
            className="lesson__icon lesson__icon--delete"
          >
            <FaRegTrashAlt />
          </button>
        </td>
      </tr>
    </>
  );
};

export default LessonsTableRow;
