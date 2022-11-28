import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = {
  id: "",
  days: "",
  hours: "",
};

const LessonsForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  return (
    <>
      <div>
        <h3>{dataToEdit?.id !== "" ? "Editar Clase" : "Agregar Clase"}</h3>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.days) {
              errors.days = "Requerido";
            }
            if (!values.hours) {
              errors.hours = "Requerido";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const obj = Object.assign({}, values);
            if (obj.id === "") {
              createData(obj);
            } else {
              updateData(obj);
            }
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue }) => {
            useEffect(() => {
              if (dataToEdit) {
                setFieldValue("id", dataToEdit.id);
                setFieldValue("days", dataToEdit.days);
                setFieldValue("hours", dataToEdit.hours);
              }
            }, [dataToEdit]);
            return (
              <>
                <Form className="form__container">
                  <div className="formulario">
                    <div>
                      <label htmlFor="days">Días</label>
                      <Field
                        className="form__input"
                        type="text"
                        name="days"
                        placeholder="Lunes, Miércoles y Viernes"
                      />
                      <ErrorMessage
                        name="days"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div>
                      <label htmlFor="hours">Horario</label>
                      <Field
                        className="form__input"
                        type="text"
                        name="hours"
                        placeholder="Lunes, Miércoles y Viernes"
                      />
                      <ErrorMessage
                        name="hours"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div className="wide actions">
                      <button
                        onClick={() => setDataToEdit(initialValues)}
                        className="btn"
                        type="button"
                        disabled={isSubmitting}
                      >
                        Limpiar
                      </button>

                      <button
                        className="btn btn__primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default LessonsForm;
