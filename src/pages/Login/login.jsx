import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../commons/spinner/spinner";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNotification } from "../../commons/Notifications/NotificationProvider";
import { signIn } from "../../store/user";

import "./login.css";

const Login = () => {
  let dispatch = useDispatch();
  // let user = useSelector((state) => state.user.user);
  let statusUser = useSelector((state) => state.user.status);
  let navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

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
        <label className="title-container">Bienvedido!!!</label>
        <p className={`form__msg ${hasError && "form__error"}`}>
          Usuario o constraseña incorrecto
        </p>
        <div className="form__group">
          <label className="label">Email</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={!emailError ? "input" : "input input__error"}
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su email"
          />
          <p className={`msg ${emailError && "msg-error"}`}>{emailError}</p>
        </div>

        <div className="form__group">
          <label className="label">Email</label>
          <i
            className="input__icons"
            onClick={() => setPasswordShown(!passwordShown)}
          >
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </i>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={!passwordError ? "input" : "input input__error"}
            type={passwordShown ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
          />

          <p className={`msg ${passwordError && "msg-error"}`}>
            {passwordError}
          </p>
        </div>

        <button className="form__button" type="submit">
          Login
        </button>

        <a href="#" className="form__forgot">
          Olvidó su contraseña?
        </a>
      </form>
    </main>
  );
};

export default Login;
