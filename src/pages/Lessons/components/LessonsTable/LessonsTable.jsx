import React from "react";
import LessonsTableRow from "../LessonsTableRow/LessonsTableRow";
import "./lessonsTable.css";

const LessonsTable = ({ data, setDataToEdit, deleteData }) => {
  console.log(data);
  return (
    <div className="lessons__container--table">
      <h3>Datos</h3>
      <table className="lessons__table">
        <thead>
          <tr>
            <th>Días</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          ) : (
            data.map((el) => (
              <LessonsTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LessonsTable;
