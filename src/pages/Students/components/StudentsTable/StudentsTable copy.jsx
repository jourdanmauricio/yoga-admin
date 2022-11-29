import React from "react";
import StudentsTableRow from "../StudentsTableRow/StudentsTableRow";

const StudentsTable = ({ data, setDataToEdit, deleteData }) => {
  console.log("data", data);
  return (
    <div className="table__container">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>DNI</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>
            {/* <th>Certificado</th> */}
            {/* <th>Cumpleaños</th> */}
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

export default StudentsTable;
