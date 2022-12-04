import React from "react";
import UsersTableRow from "../UsersTableRow/UsersTableRow";

const UsersTable = ({ data, setDataToEdit, deleteData }) => {
  console.log("data", data);
  return (
    <div className="table__container">
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
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
              <UsersTableRow
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

export default UsersTable;
