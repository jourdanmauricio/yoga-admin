import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = {
  id: "",
  email: "",
  role: "",
  password: "",
  newPassword: "",
};

const UsersForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  return (
    <>
      <div>
        <h3>
          {dataToEdit?.id !== "" ? "Modificar Usuario" : "Agregar Usuario"}
        </h3>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Requerido";
            }
            if (!values.role) {
              errors.role = "Requerido";
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
                setFieldValue("email", dataToEdit.email);
                setFieldValue("role", dataToEdit.role);
                setFieldValue("password", "");
                setFieldValue("newPassword", "");
              }
            }, [dataToEdit]);
            return (
              <>
                <Form className="form__container">
                  <div className="formulario">
                    <div>
                      <label htmlFor="email">Email</label>
                      <Field
                        className="form__input"
                        type="email"
                        name="email"
                        placeholder="user@domain.com"
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div>
                      <label htmlFor="role">Role</label>
                      <Field
                        className="form__input"
                        type="text"
                        name="role"
                        placeholder="admin"
                      />
                      <ErrorMessage
                        name="role"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div>
                      <label htmlFor="role">Password</label>
                      <Field
                        className="form__input"
                        type="password"
                        name="password"
                        placeholder="********"
                      />
                      <ErrorMessage
                        name="password"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </div>
                    <div>
                      <label htmlFor="rnewPassword">New Password</label>
                      <Field
                        className="form__input"
                        type="password"
                        name="newPassword"
                        placeholder="********"
                      />
                      <ErrorMessage
                        name="newPassword"
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

export default UsersForm;
