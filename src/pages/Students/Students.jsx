import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout/layout";
import { useNotification } from "../../commons/Notifications/NotificationProvider";
import { helpHttp } from "../../helpers/helpHttp";
import StudentsTable from "./components/StudentsTable/StudentsTable";
import StudentDeleteForm from "./components/StudentDeleteForm/StudentDeleteForm";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../commons/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import NewEditStudent from "./components/NewEditStudent/NewEditStudent";
import Message from "../../commons/Message/Message";
import StudentViewForm from "./components/StudentViewForm/StudentViewForm";
import "./students.css";
import StudentHistory from "./components/StudentHistory/StudentHistory";

const keys = ["name", "email", "dni", "phone"];

const Students = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Activo");

  const [students, setStudents] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalView, openModalView, closeModalView] = useModal(false);
  const dispatch = useNotification();

  const api = helpHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/customers`;

  const search = (data) => {
    const filterStatus = data.filter(
      (item) => status === "" || item.status === status
    );
    return filterStatus.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setStudents(res);

        setError(null);
      } else {
        setError(res);
        setStudents(null);
      }
      setLoading(false);
    });
  }, [url]);

  const createData = (data) => {
    setStudents([...students, data]);
    handleCancel();
  };

  const updateData = (data) => {
    let newData = students.map((el) => (el.id === data.id ? data : el));
    setStudents(newData);
    handleCancel();
  };

  const handleCancel = () => {
    setAction(null);
    setCurrentData(null);
    setError(null);
    if (isOpenModal) closeModal();
    if (isOpenModalView) closeModalView();
  };

  const deleteData = async (id) => {
    let endpoint = `${url}/${id}`;

    try {
      const data = await api.del(endpoint);

      if (data.statusCode) throw data;
      let newData = students.filter((el) => el.id !== id);
      setStudents(newData);
      setCurrentData(null);
      dispatch({
        type: "SUCCESS",
        message: "Alumno eliminado!",
      });
    } catch (err) {
      setError(`${err.statusCode}: ${err.error} - ${err.message}`);
      dispatch({
        type: "ERROR",
        message: "Error eliminando el alumno",
      });
    } finally {
      setAction(null);
      closeModal();
    }
  };

  const handleAction = (action, data) => {
    console.log("Action", action);
    console.log("currentData", data);
    setCurrentData(data);
    setAction(action);
    if (action === "DELETE") openModal();
    if (action === "VIEW") openModalView();
  };

  return (
    <Layout>
      {/* TITLE */}
      {(!action || action === "DELETE" || action === "VIEW") && (
        <h1 className="title">Alumnos</h1>
      )}
      {action === "NEW" && <h1 className="title">Nuevo alumno</h1>}
      {action === "EDIT" && (
        <h1 className="title">Modificar alumno {currentData.name}</h1>
      )}

      {/* MESSAGE */}
      {error && <Message msg={error} closeMessage={() => setError(null)} />}

      {/* OPTIONS */}
      {(!action || action === "DELETE" || action === "VIEW") && (
        <div className="table__options">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Buscar..."
            className="input"
          />
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="input"
            name="status"
          >
            <option value="Activo">Activo</option>
            <option value="Baja">Baja</option>
            <option value="">Todos</option>
          </select>
          <button
            onClick={() => setAction("NEW")}
            className="btn btn__primary"
            id="newStudent"
            type="button"
          >
            Nuevo alumno
          </button>
        </div>
      )}

      {action && (action === "NEW" || action === "EDIT") && (
        <div>
          <NewEditStudent
            handleCancel={handleCancel}
            currentData={currentData}
            createStudent={createData}
            updateStudent={updateData}
            setError={setError}
          />
        </div>
      )}

      {action && action === "EDIT" && (
        <div>
          <StudentHistory
            handleCancel={handleCancel}
            currentData={currentData}
            setError={setError}
          />
        </div>
      )}

      {loading && <Loader />}

      {/* DATA */}

      {students && action !== "EDIT" && action !== "NEW" && (
        <StudentsTable
          data={search(students)}
          handleAction={handleAction}
        ></StudentsTable>
      )}

      {/* MODALS */}

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <StudentDeleteForm
          currentData={currentData}
          handleDelete={deleteData}
          handleCancel={handleCancel}
        />
      </Modal>

      <Modal isOpenModal={isOpenModalView} closeModal={closeModalView}>
        {currentData && (
          <StudentViewForm
            currentData={currentData}
            handleCancel={handleCancel}
          />
        )}
      </Modal>
    </Layout>
  );
};
export default Students;
