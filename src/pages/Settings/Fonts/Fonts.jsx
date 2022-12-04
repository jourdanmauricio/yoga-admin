import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { helHttp } from "../../../helpers/helpHttp";

const Fonts = ({ settings, setError, dispatch, setLoading }) => {
  const api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/settings`;

  return (
    <Formik
      initialValues={{
        title_font_size: "30px",
        paragraph_font_size: "16px",
        title_font_weight: 400,
        paragraph_font_weight: 400,
      }}
      validate={(values) => {
        const errors = {};
        if (
          values.paragraph_font_size.length > 0 &&
          !/^([0-9]){1,2}px$/.test(values.paragraph_font_size)
        ) {
          errors.paragraph_font_size = "Formato en pixeles. Ej 16px";
        }
        if (
          values.title_font_size.length > 0 &&
          !/^([0-9]){1,2}px$/.test(values.title_font_size)
        ) {
          errors.title_font_size = "Formato en pixeles. Ej 30px";
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
        } catch (err) {
          dispatch({
            type: "ERROR",
            message: "Error modificando la configuración",
          });
          setError(`${err.statusCode}: ${err.error} - ${err.message}`);
          console.log(err);
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => {
        useEffect(() => {
          if (settings) {
            setFieldValue(
              "title_font_size",
              settings.title_font_size || "30px"
            );
            setFieldValue(
              "paragraph_font_size",
              settings.paragraph_font_size || "16px"
            );
          }
          console.log("Settings", settings);
        }, [settings]);

        return (
          <Form>
            <div className="formulario">
              <div>
                <label htmlFor="title_font_size">
                  Tamaño de fuente para títulos
                </label>
                <Field
                  className="form__input"
                  type="text"
                  name="title_font_size"
                  placeholder="30px"
                />
                <ErrorMessage
                  name="title_font_size"
                  render={(msg) => <div className="error">{msg}</div>}
                />
              </div>

              <div>
                <label htmlFor="paragraph_font_size">
                  Tamaño de fuente para párrafos
                </label>
                <Field
                  className="form__input"
                  type="text"
                  name="paragraph_font_size"
                  placeholder="16px"
                />
                <ErrorMessage
                  name="paragraph_font_size"
                  render={(msg) => <div className="error">{msg}</div>}
                />
              </div>

              <div>
                <label htmlFor="title_font_weight">
                  Peso de fuente para títulos
                </label>
                <Field
                  className="form__input"
                  as="select"
                  type="text"
                  name="title_font_weight"
                  // onChange={(e) => handleChange(e.target.value)}
                >
                  <option value={400}>400</option>
                  <option value={500}>500</option>
                  <option value={600}>600</option>
                  <option value={700}>700</option>
                </Field>
              </div>

              <div>
                <label htmlFor="paragraph_font_weight">
                  Peso de fuente para párrafos
                </label>
                <Field
                  className="form__input"
                  as="select"
                  type="text"
                  name="paragraph_font_weight"
                  // onChange={(e) => handleChange(e.target.value)}
                >
                  <option value={400}>400</option>
                  <option value={500}>500</option>
                  <option value={600}>600</option>
                  <option value={700}>700</option>
                </Field>
              </div>

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

export default Fonts;