import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaRegCalendarAlt,
  FaAngleLeft,
  FaAngleRight,
  FaUsers,
  FaTh,
} from "react-icons/fa";

import Nav from "../Nav/nav";
import "./layout.css";

const Layout = (props) => {
  const [minItems, setMinItems] = useState(false);
  const handleMinItems = () => {
    setMinItems(!minItems);
  };
  return (
    <div className="layout">
      <Nav></Nav>
      <main className="main">
        <div className={`sidebar ${minItems ? "full" : "mini"}`}>
          <button className="sidebar__item--cta" onClick={handleMinItems}>
            {minItems ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
          <NavLink className="item__detail" to="#">
            <FaTh className="material__icon" />
            <span className="icon-text">Dashboard</span>
          </NavLink>
          <br />
          <NavLink className="item__detail" to="#">
            <FaCog className="material__icon" />
            <span className="icon-text">Configuración</span>
          </NavLink>
          <br />
          <NavLink className="item__detail" to="#">
            <FaRegCalendarAlt className="material__icon" />
            <span className="icon-text">Clases</span>
          </NavLink>
          <br />
          <NavLink className="item__detail" to="#">
            <FaUsers className="material__icon" />
            <span className="icon-text">Alumnos</span>
          </NavLink>
        </div>
        <section
          className={`main__content ${minItems && "main__content--full"}`}
        >
          {props.children}
        </section>
      </main>
      <footer className="footer">FOOTER</footer>
    </div>
  );
};

export default Layout;
