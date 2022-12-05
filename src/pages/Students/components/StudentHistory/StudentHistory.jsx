import React, { useEffect, useState } from "react";
import Loader from "@/commons/Loader-overlay/Loader-overlay";
import { helpHttp } from "@/helpers/helpHttp";
import { formatDate } from "../../../../helpers/helpFunctions";
import { useNotification } from "@/commons/Notifications/NotificationProvider";

const StudentHistory = ({ currentData, handleCancel, setError }) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const dispatch = useNotification();

  const api = helpHttp();
  useEffect(() => {
    async function fetchData() {
      const url = `${import.meta.env.VITE_BACKEND_API}/customers-history/${
        currentData?.id
      }`;
      let data = await api.get(url);
      console.log("data 1", data);
      data = data.map((el) => ({
        id: el.id,
        start: formatDate(el.start),
        end: formatDate(el.end),
      }));
      console.log("data 2", data);
      setHistory(data);
    }
    fetchData();
  }, [currentData]);

  const handleChange = (id, feature, value) => {
    console.log("Change", id, feature, value);
    const newData = history.map((el) =>
      el.id === id ? { ...el, ...{ [feature]: value, touched: true } } : el
    );
    setHistory(newData);
  };

  const handleSubmit = async (e) => {
    console.log("history", history);
    e.preventDefault();
    const arrHistory = history.filter((el) => el.touched === true);
    try {
      setLoading(true);
      for (const hist of arrHistory) {
        const endpoint = `${
          import.meta.env.VITE_BACKEND_API
        }/customers-history/${hist.id}`;
        let obj = { start: hist.start, end: hist.end };
        const dataHist = await api.put(endpoint, { body: obj });
        if (dataHist.statusCode) {
          throw dataHist;
        }
      }

      dispatch({
        type: "SUCCESS",
        message: "Historial modificado!",
      });
      handleCancel();
    } catch (err) {
      setError(`${err.statusCode}: ${err.error} - ${err.message}`);
      dispatch({
        type: "ERROR",
        message: "Error modificando el historial",
      });
    } finally {
      const newData = history.map((el) => ({
        id: el.id,
        start: el.start,
        end: el.end,
      }));
      setHistory(newData);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <form onSubmit={handleSubmit} className="form__container">
          <div>
            <p>History</p>
            <div className="table__container--student">
              <table className="table__student">
                <thead>
                  <tr>
                    <th>Id</th>
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
                        <td>{el.id}</td>
                        <td>
                          <input
                            className="form__input form__input--date"
                            type="date"
                            name="start"
                            value={el.start}
                            placeholder="20/10/2000"
                            onChange={(e) =>
                              handleChange(el.id, e.target.name, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="form__input form__input--date"
                            type="date"
                            name="end"
                            value={el.end}
                            placeholder="20/10/2000"
                            onChange={(e) =>
                              handleChange(el.id, e.target.name, e.target.value)
                            }
                          />
                        </td>
                        {/* <td>{formatDateTable(el.start)}</td> */}
                        {/* <td>{formatDateTable(el.end)}</td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="wide actions">
            <button onClick={handleCancel} className="btn" type="button">
              Cancelar
            </button>

            <button className="btn btn__primary" type="submit">
              Modificar
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default StudentHistory;
