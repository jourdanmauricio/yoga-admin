import React from "react";
import BirthdayMonthTableRow from "./BirthdayMonthTableRow";

const BirthdayMonthTable = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Edad</th>
          <th>Cumpleaños</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="4">Sin datos</td>
          </tr>
        ) : (
          data.map((el) => <BirthdayMonthTableRow key={el.id} el={el} />)
        )}
      </tbody>
    </table>
  );
};

export default BirthdayMonthTable;
