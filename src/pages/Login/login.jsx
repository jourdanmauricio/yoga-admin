import React, { useEffect, useState } from "react";
import "./login.css";

import Title from "./components/Title/title";
import Input from "./components/Input/input";
import Button from "./components/Button/button";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/user";
import { useNavigate } from "react-router-dom";
import Spinner from "../../commons/spinner/spinner";
import { useNotification } from "../../commons/Notifications/NotificationProvider";

const Login = () => {
  let dispatch = useDispatch();
  // let user = useSelector((state) => state.user.user);
  let statusUser = useSelector((state) => state.user.status);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const dispatchNotif = useNotification();

  useEffect(() => {
    if (statusUser === "failed") setHasError(true);
    if (statusUser === "success") {
      dispatchNotif({
        type: "SUCCESS",
        message: "Bievenido!!! 💙 🧘‍♀️ ",
      });

      navigate("/home");
    }
  }, [statusUser]);

  function handleChange(name, value) {
    if (name === "email") {
      const pattern =
        "^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$";
      setEmail(value);
      let regex = new RegExp(pattern);
      regex.exec(value) === null
        ? setEmailError("Ingresa un email válido")
        : setEmailError(null);
    }
    if (name === "password") {
      setPassword(value);
      if (value.length < 8) {
        setPasswordError("Mínimo 8 caracteres");
        return;
      }
      setPasswordError(null);
    }
  }

  function isMatch() {
    dispatch(
      signIn({
        email,
        password,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    let error = false;
    if (email.length === 0) {
      setEmailError("Obligatorio");
      error = true;
    }
    if (password.length === 0) {
      setPasswordError("Obligatorio");
      error = true;
    }

    if (error || emailError !== null || passwordError !== null) return;

    isMatch();
  }

  return (
    <main className="container">
      {statusUser === "loading" && <Spinner />}
      <form className="login__container" onSubmit={handleSubmit} noValidate>
        <Title text="Bienvedido!!!" />
        <label className={`form__msg ${hasError && "form__error"}`}>
          Usuario o constraseña incorrecto
        </label>
        <Input
          attribute={{
            id: "email",
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Ingrese su email",
          }}
          handleChange={handleChange}
          error={emailError}
        />
        <Input
          attribute={{
            id: "password",
            label: "Contraseña",
            name: "password",
            type: "password",
            placeholder: "Ingrese su contraseña",
          }}
          handleChange={handleChange}
          error={passwordError}
        />

        <Button />

        <a href="#" className="form__forgot">
          Olvidó su contraseña?
        </a>
      </form>
    </main>
  );
};

export default Login;
