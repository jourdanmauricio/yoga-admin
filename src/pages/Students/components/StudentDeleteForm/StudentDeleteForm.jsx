import React from "react";

const StudentDeleteForm = ({ currentData, handleDelete, handleCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete(currentData.id);
  };

  return (
    <form className="confirm__delete" onSubmit={handleSubmit}>
      <h2 className="title">Eliminar Alumno</h2>
      <p className="delete__paragraph">
        Esta seguro de eliminar el alumno {currentData?.name}
      </p>
      <div className="delete__actions">
        <button
          className="btn"
          onClick={handleCancel}
          id="cancel"
          type="button"
        >
          Cancelar
        </button>

        <button className="btn btn__primary" id="delete" type="submit">
          Eliminar
        </button>
      </div>
    </form>
  );
};

export default StudentDeleteForm;
