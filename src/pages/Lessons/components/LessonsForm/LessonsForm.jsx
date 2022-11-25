import React, { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import "./lessonsForm.css";

const initialForm = {
  days: "",
  hours: "",
  id: null,
};

const LessonsForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);
  const [daysError, setDaysError] = useState(null);
  const [hoursError, setHoursError] = useState(null);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (name, value) => {
    let errorMsg = "Obligatorio";
    if (value.length > 0) errorMsg = null;
    name === "days" ? setDaysError(errorMsg) : setHoursError(errorMsg);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;
    if (!form.days) {
      setDaysError("Obligatorio");
      error = true;
    }
    if (!form.hours) {
      setHoursError("Obligatorio");
      error = true;
    }

    if (error) return;

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }
    handleClick("reset");
  };

  const handleClick = (type) => {
    if (type === "reset") {
      console.log("RESET");
      setForm(initialForm);
      setDataToEdit(null);
    }
  };

  return (
    <div className="lessons__form--container">
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form className="lessons__form" onSubmit={handleSubmit}>
        <Input
          attribute={{
            id: "days",
            label: "Días",
            name: "days",
            type: "text",
            placeholder: "Ingrese los días",
            value: form.days,
          }}
          handleChange={handleChange}
          error={daysError}
        />
        <Input
          attribute={{
            id: "hours",
            label: "Horario",
            name: "hours",
            type: "text",
            placeholder: "Ingrese el horario",
            value: form.hours,
          }}
          handleChange={handleChange}
          error={hoursError}
        />
        <div className="lessons__buttons">
          <Button type="reset" text="Limpiar" handleClick={handleClick} />
          <Button type="submit" text="Enviar" handleClick={handleClick} />
        </div>
      </form>
    </div>
  );
};

export default LessonsForm;
