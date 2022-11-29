import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { helHttp } from "@/helpers/helpHttp";
import { useNotification } from "@/commons/Notifications/NotificationProvider";
import Loader from "@/components/Loader/Loader";

const initialValues = {
  id: "",
  status: "Activo",
  name: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  age: "",
  dni: "",
  certificate: false,
  comment: "",
};

const NewEditStudent = ({
  handleCancel,
  currentData,
  createStudent,
  updateStudent,
  setError,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useNotification();

  let api = helHttp();
  let url = `${import.meta.env.VITE_BACKEND_API}/customers`;

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Requerido";
        } else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/.test(values.name)) {
          errors.name = "El nombre acepta letras y espacios";
        }

        if (
          values.email.length > 0 &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Email inválido";
        }

        if (values.phone.length > 0 && !/^[0-9*\s()+?-]*$/.test(values.phone)) {
          errors.phone = "El teléfono solo admite números, -, +, y ()";
        }

        if (values.comment.length > 0 && !/^.{1,255}$/.test(values.comment)) {
          errors.comment = "El comentario no puede exceder los 255 caracteres";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setLoading(true);
        const obj = Object.assign({}, values);
        delete obj.id;
        obj.dni = obj.dni.toString();
        for (const prop in obj) {
          if (obj[prop] === "") obj[prop] = null;
        }

        let errorMessage;
        try {
          let data;
          let message;

          if (currentData) {
            const endpoint = `${url}/${currentData.id}`;
            message = "modificado";
            errorMessage = "modificando";
            data = await api.put(endpoint, { body: obj });
          } else {
            data = await api.post(url, { body: obj });
            message = "creado";
            errorMessage = "creando";
          }

          if (data.statusCode) {
            throw data;
          }
          dispatch({
            type: "SUCCESS",
            message: `Alumno ${message}!`,
          });
          currentData ? updateStudent(data) : createStudent(data);
        } catch (err) {
          setError(`${err.statusCode}: ${err.error} - ${err.message}`);
          dispatch({
            type: "ERROR",
            message: `Error ${errorMessage} el alumno`,
          });
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => {
        useEffect(() => {
          if (currentData) {
            setFieldValue("id", currentData.id || "");
            setFieldValue("status", currentData.status || "");
            setFieldValue("name", currentData.name || "");
            setFieldValue("email", currentData.email || "");
            setFieldValue("phone", currentData.phone || "");
            setFieldValue("address", currentData.address || "");
            setFieldValue("birthday", currentData.birthday || "");
            setFieldValue("age", currentData.age || "");
            setFieldValue("dni", currentData.dni || "");
            setFieldValue("certificate", currentData.certificate || "");
            setFieldValue("comment", currentData.comment || "");
          }
        }, [currentData]);

        return (
          <>
            {loading && <Loader />}
            {!loading && (
              <Form className="form__container">
                <div className="formulario">
                  <div>
                    <label htmlFor="id">Id</label>
                    <Field
                      className="form__input"
                      type="text"
                      name="id"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="status">Estado</label>
                    <Field
                      className="form__input"
                      as="select"
                      type="text"
                      name="status"
                      disabled={!currentData}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Baja">Baja</option>
                    </Field>
                  </div>
                  <div>
                    <label htmlFor="name">Nombre</label>
                    <Field
                      className="form__input"
                      type="text"
                      name="name"
                      placeholder="Nombre y apellido"
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    <label htmlFor="name">Email</label>
                    <Field
                      className="form__input"
                      type="email"
                      name="email"
                      placeholder="email@dominio.com"
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Teléfono</label>
                    <Field
                      className="form__input"
                      type="text"
                      name="phone"
                      placeholder="(cod) xxxx-xxxx"
                    />
                    <ErrorMessage
                      name="phone"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    <label htmlFor="address">Dirección</label>
                    <Field
                      className="form__input"
                      type="text"
                      name="address"
                      placeholder="Calle, nro, depto, localidad"
                    />
                  </div>
                  <div>
                    <label htmlFor="birthday">Fecha de nacimiento</label>
                    <Field
                      className="form__input"
                      type="date"
                      name="birthday"
                      placeholder="20/10/2000"
                    />
                  </div>
                  <div>
                    <label htmlFor="age">Edad</label>
                    <Field
                      className="form__input"
                      type="number"
                      name="age"
                      placeholder="99"
                    />
                  </div>
                  <div>
                    <label htmlFor="dni">DNI</label>
                    <Field
                      className="form__input"
                      type="number"
                      name="dni"
                      placeholder="99999999"
                    />
                  </div>
                  <div className="check__container">
                    <label>
                      <Field
                        className="checkbox"
                        type="checkbox"
                        name="certificate"
                      />
                      <span>Certificado médico</span>
                    </label>
                  </div>
                  <div className="wide">
                    <label htmlFor="comment">Comentario</label>
                    <Field
                      className="form__input"
                      name="comment"
                      rows="5"
                      component="textarea"
                    />
                    <ErrorMessage
                      name="comment"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div className="wide actions">
                    <button
                      onClick={handleCancel}
                      className="btn"
                      type="botton"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>

                    <button
                      className="btn btn__primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {currentData ? "Modificar" : "Agregar"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </>
        );
      }}
    </Formik>
    // </>
  );
};

export default NewEditStudent;
