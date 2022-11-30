import React from "react";
import StudentsTableRow from "../StudentsTableRow/StudentsTableRow";

const StudentsTable = ({ data, handleAction }) => {
  return (
    <>
      <div className="table__container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>DNI</th>
              <th>Estado</th>
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
                <StudentsTableRow
                  key={el.id}
                  el={el}
                  handleAction={handleAction}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentsTable;
