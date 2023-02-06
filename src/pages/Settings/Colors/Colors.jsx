import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { helpHttp } from "../../../helpers/helpHttp";

const Colors = ({ settings, setError, dispatch, setLoading }) => {
  const api = helpHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/settings`;

  const fields = [
    { id: "title_color", name: "Color títulos" },
    { id: "paragraph_color", name: "Color párrafos" },
    { id: "button_color", name: "Color botones" },
    { id: "effect_color", name: "Color transiciones" },
    { id: "error_color", name: "Color errores" },
    { id: "divisor_color", name: "Color divisor - secciones" },
    { id: "h1_color", name: "Color título encabezado" },
    { id: "paragraph_header_color", name: "Color párrafo encabezado" },
    { id: "background_color", name: "Color fondo" },
    { id: "background_footer_color", name: "Color fondo pie de página" },
    { id: "table_header_color", name: "Color fondo encabezado de horarios" },
    {
      id: "table_header_text_color",
      name: "Color texto encabezado de horarios",
    },
    { id: "table_body_color", name: "Color fondo datos de horarios" },
    { id: "table_border_color", name: "Color bordes de horarios" },
    { id: "table_body_text_color", name: "Color texto de horarios" },
  ];

  return (
    <Formik
      initialValues={{
        title_color: "#531253",
        paragraph_color: "#121212",
        button_color: "#531253",
        effect_color: "#531253",
        error_color: "#f44336",
        divisor_color: "#531253",
        h1_color: "#ffffff",
        paragraph_header_color: "#ffffff",
        background_color: "#eaeaea",
        background_footer_color: "#fafafa",
        table_header_color: "#eaeaea",
        table_header_text_color: "#170312",
        table_body_color: "#eaeaea",
        table_border_color: "#170312",
        table_body_text_color: "#170312",
      }}
      validate={(values) => {
        const errors = {};
        const regex = /^#?([a-fA-F0-9]){6}$/;

        for (let value in values) {
          if (value.length > 0 && !regex.test(values[value])) {
            errors[value] = "Formato Hexadecimal #rrggbb";
          }
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setLoading(true);
          const data = await api.put(url, { body: { data: values } });
          if (data.statusCode) {
            throw data;
          }
          dispatch({
            type: "SUCCESS",
            message: "Configuración modificada!",
          });
          setError(null);
        } catch (err) {
          dispatch({
            type: "ERROR",
            message: "Error modificando la configuración",
          });
          setError(`${err.statusCode}: ${err.error} - ${err.message}`);
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => {
        useEffect(() => {
          if (settings) {
            for (let field of fields) {
              setFieldValue(field.id, settings[field.id]);
            }
          }
        }, [settings]);

        return (
          <Form>
            <div className="formulario">
              {fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.name}</label>
                  <input
                    className="form__input--color"
                    type="color"
                    value={values[field.id]}
                    onChange={(e) => setFieldValue(field.id, e.target.value)}
                  />
                  <Field
                    value={values[field.id]}
                    type="text"
                    id={field.id}
                    name={field.id}
                    placeholder="#531253"
                    className="form__input form__input--colorDesc"
                  />
                  <ErrorMessage
                    name={field.id}
                    render={(msg) => <div className="error">{msg}</div>}
                  />
                </div>
              ))}

              {/* ACTIONS */}
              <div className="wide action">
                <button
                  className="btn btn__primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Modificar
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Colors;
