import React from "react";
import NoCertificateTableRow from "./NoCertificateTableRow";

const NoCertificateTable = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Edad</th>
          <th>Fecha de alta</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="3">Sin datos</td>
          </tr>
        ) : (
          data.map((el) => <NoCertificateTableRow key={el.id} el={el} />)
        )}
      </tbody>
    </table>
  );
};

export default NoCertificateTable;
