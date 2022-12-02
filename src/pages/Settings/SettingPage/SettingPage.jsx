import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../../commons/Notifications/NotificationProvider";
import Loader from "@/components/Loader/Loader";
import { helHttp } from "../../../helpers/helpHttp";
import { useSelector } from "react-redux";

const SettingPage = ({ settings, setError }) => {
  let user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(false);
  const [newLogo, setNewLogo] = useState(null);
  const dispatch = useNotification();

  const api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/settings`;

  const handleCancel = () => {
    console.log("Cancel");
  };
  return (
    <Formik
      initialValues={{
        Facebook: "",
        Instagram: "",
        Twitter: "",
        Whatsapp: "",
        email: "",
        logo: "",
        phone: "",
        title_color: "#000000",
        paragraph_color: "#000000",
      }}
      validate={(values) => {
        const errors = {};
        if (
          values.Facebook.length > 0 &&
          !/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i.test(
            values.Facebook
          )
        ) {
          errors.Facebook = "Ingrese un perfil válido para Facebook";
        }

        if (
          values.Twitter.length > 0 &&
          !/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(
            values.Twitter
          )
        ) {
          errors.Twitter = "Ingrese un perfil válido para Twitter";
        }

        if (
          values.Instagram.length > 0 &&
          !/(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am|twitter\.com)\/([A-Za-z0-9-_\.]+)/im.test(
            values.Instagram
          )
        ) {
          errors.Instagram = "Ingrese un perfil válido para Instagram";
        }

        if (
          values.Whatsapp.length > 0 &&
          !/(?:(?:http|https):\/\/)?(?:www\.)?(?:wa\.me)\/.*$/.test(
            values.Whatsapp
          )
        ) {
          errors.Whatsapp = "Ingrese un link válido para Whatsapp";
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

        if (
          values.title_color.length > 0 &&
          !/^#?([a-fA-F0-9]){6}$/.test(values.title_color)
        ) {
          errors.title_color = "Formato Hexadecimal #rrggbb";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // console.log("Logo", values.logo);
          setLoading(true);
          /* upload-image */
          if (newLogo) {
            console.log("Enviar", newLogo);
            const fd = new FormData();
            fd.append("image", newLogo, values.logo);

            const response = await fetch(`${url}/upload-file`, {
              method: "POST",
              body: fd,
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            });
            const uploadImg = await response.json();
            values.logo = uploadImg.image;

            if (uploadImg.statusCode) {
              throw uploadImg;
            }
          }

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
            setFieldValue("Twitter", settings.Twitter || "");
            setFieldValue("Facebook", settings.Facebook || "");
            setFieldValue("Instagram", settings.Instagram || "");
            setFieldValue("Whatsapp", settings.Whatsapp || "");
            setFieldValue("email", settings.email || "");
            setFieldValue("phone", settings.phone || "");
            setFieldValue("logo", settings.logo || "");
            setFieldValue("title_color", settings.title_color || "#000000");
            setFieldValue(
              "paragraph_color",
              settings.paragraph_color || "#000000"
            );
          }
          console.log("Settings", settings);
        }, [settings]);

        return (
          <>
            {loading && <Loader />}
            {!loading && (
              <Form className="form__container">
                <div className="formulario">
                  <div>
                    <label htmlFor="Twitter">Twitter</label>
                    <Field
                      className="form__input"
                      type="text"
                      name="Twitter"
                      placeholder="https://twitter.com/jourdanmau"
                    />
                    <ErrorMessage
                      name="Twitter"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    <label htmlFor="Facebook">Fecebook</label>
                    <Field
                      className="form__input"
                      type="text"
                      name="Facebook"
                      placeholder="https://www.facebook.com/mauricio.jourdan.33"
                    />
                    <ErrorMessage
                      name="Facebook"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    <label htmlFor="Instagram">Instagram</label>
                    <Field
                      className="form__input"
                      type="text"
                      name="Instagram"
                      placeholder="https://www.instagram.com/mauricio.jourdan.33/"
                    />
                    <ErrorMessage
                      name="Instagram"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    <label htmlFor="Whatsapp">Whatsapp</label>
                    <Field
                      className="form__input"
                      type="text"
                      name="Whatsapp"
                      placeholder="https://wa.me/5491158046525?text=Hola, quiero rebir información"
                    />
                    <ErrorMessage
                      name="Whatsapp"
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
                    <label htmlFor="email">Email</label>
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

                  <div className="settings__logo">
                    <label htmlFor="logo">Logo</label>
                    <input
                      id="logo"
                      name="logo"
                      accept="image/png, image/jpg, image/jpeg, image/svg"
                      type="file"
                      onChange={(event) => {
                        setNewLogo(event.currentTarget.files[0]);
                        setFieldValue(
                          "logo",
                          event.currentTarget.files[0].name
                        );
                      }}
                    />
                    {/* <img
                      src={values.logo}
                      alt={values.logo}
                      className="img-thumbnail mt-2"
                      height={200}
                      width={200}
                    /> */}
                    {/* <Field
                      className="form__input form__input--date"
                      type="text"
                      name="logo"
                      placeholder="Seleccione logotipo (300px x 50)"
                    /> */}
                  </div>
                  <div>
                    <img className="logo" src={values.logo} alt={values.logo} />
                  </div>
                  <div>
                    <label htmlFor="title_color">Color de títulos</label>
                    <input
                      className="form__input--color"
                      type="color"
                      value={values.title_color}
                      onChange={(e) =>
                        setFieldValue("title_color", e.target.value)
                      }
                    />
                    <Field
                      value={values.title_color}
                      type="text"
                      id="title_color"
                      name="title_color"
                      className="form__input form__input--colorDesc"
                    />
                    <ErrorMessage
                      name="title_color"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    <label htmlFor="paragraph_color">Color de párrafos</label>
                    <input
                      className="form__input--color"
                      type="color"
                      value={values.paragraph_color}
                      onChange={(e) =>
                        setFieldValue("paragraph_color", e.target.value)
                      }
                    />
                    <Field
                      value={values.paragraph_color}
                      type="text"
                      id="paragraph_color"
                      name="paragraph_color"
                      className="form__input form__input--colorDesc"
                    />
                    <ErrorMessage
                      name="paragraph_color"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>

                  <div className="wide actions">
                    <button
                      onClick={handleCancel}
                      className="btn"
                      type="button"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>

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
            )}
          </>
        );
      }}
    </Formik>
    // </>
  );
};
export default SettingPage;
