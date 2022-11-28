import React from "react";

const StudentDeleteForm = ({
  dataToDelete,
  handleDelete,
  handleCancelDelete,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete(dataToDelete.id);
  };

  return (
    <form className="confirm__delete" onSubmit={handleSubmit}>
      <h2 className="title">Eliminar Alumno</h2>
      <p className="delete__paragraph">
        Esta seguro de eliminar el alumno {dataToDelete?.name}?{" "}
      </p>
      <div className="delete__actions">
        <button
          className="btn"
          onClick={handleCancelDelete}
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
