import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout/layout";
import { useNotification } from "../../commons/Notifications/NotificationProvider";
import { helHttp } from "../../helpers/helpHttp";
import StudentsTable from "./components/StudentsTable/StudentsTable";
import StudentDeleteForm from "./components/StudentDeleteForm/StudentDeleteForm";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../commons/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import NewEditStudent from "./components/NewEditStudent/NewEditStudent";
import Message from "../../commons/Message/Message";

const Students = () => {
  const [students, setStudents] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useNotification();

  const api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/customers`;

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
    setCurrentData(data);
    setAction(action);
    if (action === "DELETE") openModal();
  };

  return (
    <Layout>
      {!action && <h1 className="title">Alumnos</h1>}
      {action === "NEW" && <h1 className="title">Nuevo alumno</h1>}
      {action === "EDIT" && (
        <h1 className="title">Modificar alumno {currentData.name}</h1>
      )}
      {error && <Message msg={error} closeMessage={() => setError(null)} />}

      {!action && (
        <button
          onClick={() => setAction("NEW")}
          className="btn btn__primary"
          id="newStudent"
          type="button"
        >
          Nuevo alumno
        </button>
      )}

      {action && action !== "DELETE" && (
        <NewEditStudent
          handleCancel={handleCancel}
          currentData={currentData}
          createStudent={createData}
          updateStudent={updateData}
          setError={setError}
        />
      )}
      {loading && <Loader />}
      {students && action !== "EDIT" && action !== "NEW" && (
        <StudentsTable
          data={students}
          handleAction={handleAction}
        ></StudentsTable>
      )}
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <StudentDeleteForm
          currentData={currentData}
          handleDelete={deleteData}
          handleCancelDelete={handleCancel}
        />
      </Modal>
    </Layout>
  );
};
export default Students;
