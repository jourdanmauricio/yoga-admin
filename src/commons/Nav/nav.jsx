import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPowerOff, FaBars } from "react-icons/fa";
import logo from "../../assets/logos/logo2.svg";

import { logOut } from "../../store/user";

import "./nav.css";

const Nav = () => {
  const [mobileMenu, setMobileMenu] = useState(true);
  let user = useSelector((state) => state.user.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <nav>
      <div className="menu">
        <FaBars onClick={handleMobileMenu} />
      </div>
      <div className="navbar">
        <img src={logo} alt="logo" className="logo" />
        <ul>
          <li>
            {user && (
              <button className="navbar__logout" onClick={handleLogout}>
                <FaPowerOff />
              </button>
            )}
          </li>
        </ul>
      </div>
      <div
        className={`mobile-menu ${mobileMenu && "inactive"}`}
        // className="mobile-menu inactive"
      >
        <ul>
          <li>
            <a href="/#inicio">Inicio</a>
          </li>
          <li>
            <a href="/#servicios">Servicios</a>
          </li>
          <li>
            <a href="/">Horarios</a>
          </li>
          <li>
            <a href="./contacto.html" className="menu__active">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
