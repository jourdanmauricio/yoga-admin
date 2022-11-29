import React, { useEffect, useState } from "react";
import { formatDateTable } from "@/helpers/helpFunctions";
import "./studentView.css";
import { helHttp } from "@/helpers/helpHttp";

const StudentViewForm = ({ currentData, handleCancel }) => {
  const [history, setHistory] = useState([]);
  const api = helHttp();
  useEffect(() => {
    async function fetchData() {
      const url = `${import.meta.env.VITE_BACKEND_API}/customers-history/${
        currentData?.id
      }`;
      const data = await api.get(url);
      setHistory(data);
      console.log("history", history);
    }
    fetchData();
  }, [currentData]);
  return (
    <div className="student__container">
      <h2 className="title">Alumno {currentData.name}</h2>
      <div className="student__info">
        <p className="info__feature">Nombre:</p>
        <p> {currentData.name}</p>
        <p className="info__feature">Estado:</p>
        <p> {currentData.status}</p>
        <p className="info__feature">Teléfono:</p>
        <p> {currentData.phone}</p>
        <p className="info__feature">Email:</p>
        <p> {currentData.email}</p>
        <p className="info__feature">Inicio: </p>
        <p>{formatDateTable(currentData.start)}</p>
        <p className="info__feature">Dirección: </p>
        <p>{currentData.address}</p>
        <p className="info__feature">Nacimiento: </p>
        <p>{formatDateTable(currentData.birthday)}</p>
        <p className="info__feature">Edad: </p>
        <p>{currentData.age}</p>
        <p className="info__feature">DNI: </p>
        <p>{currentData.dni}</p>
        <p className="info__feature">Cert Médico: </p>
        <p>{currentData.certificate ? "Sí" : "No"}</p>
        <p className="info__feature">Comentario:</p>
        <p> {currentData.comment}</p>
      </div>
      <div className="table__container">
        <table className="table">
          <thead>
            <tr>
              <th>Inicio</th>
              <th>Fin</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="2">Sin datos</td>
              </tr>
            ) : (
              history.map((el) => (
                <tr key={el.id}>
                  <td>{formatDateTable(el.start)}</td>
                  <td>{formatDateTable(el.end)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="student__actions">
        <button
          className="btn btn__primary"
          onClick={handleCancel}
          id="close"
          type="button"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default StudentViewForm;
