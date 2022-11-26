import React from "react";
import Button from "@/components/Button/Button";

import "./lessonsDeleteForm.css";

const LessonsDeleteForm = ({
  dataToDelete,
  handleDelete,
  handleCancelDelete,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete(dataToDelete.id);
  };

  const handleClick = (type) => {
    if (type === "button") handleCancelDelete();
  };

  return (
    <form className="lesson__delete" onSubmit={handleSubmit}>
      <h2 className="delete__title">Eliminar clase</h2>
      <p className="delete__paragraph">
        Esta seguro de eliminar la clase {dataToDelete?.id}?{" "}
      </p>
      <div className="delete__actions">
        <Button type="button" text="Cancelar" handleClick={handleClick} />
        <Button type="submit" text="Eliminar" handleClick={handleClick} />
      </div>
    </form>
  );
};

export default LessonsDeleteForm;
