import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout/layout";
import { useNotification } from "../../commons/Notifications/NotificationProvider";
import { helHttp } from "../../helpers/helpHttp";
import { Navigate, useNavigate } from "react-router-dom";
import StudentsTable from "./components/StudentsTable/StudentsTable";
import StudentDeleteForm from "./components/StudentDeleteForm/StudentDeleteForm";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../commons/Modal/Modal";
import Loader from "../../components/Loader/Loader";

const Students = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const navigate = useNavigate();
  const [students, setStudents] = useState(null);
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
        console.log(students);
        setError(null);
      } else {
        setError(res);
        setStudents(null);
      }
      setLoading(false);
    });
  }, [url]);

  // const createData = (data) => {
  //   delete data.id;
  //   data.status = "Activo";
  //   api.post(url, { body: data }).then((res) => {
  //     if (!res.err) {
  //       setDb([...db, res]);
  //       dispatch({
  //         type: "SUCCESS",
  //         message: "Alumno creada!",
  //       });
  //     } else {
  //       dispatch({
  //         type: "ERROR",
  //         message: "Error creando el alumno",
  //       });
  //       setError(res);
  //     }
  //   });
  // };

  const handleClick = () => {
    navigate("/students/new");
  };

  const setDataToEdit = () => {
    //
  };

  const deleteData = (student) => {
    console.log("Confirm", student);
    setDataToDelete(student);
    openModal();
  };

  const handleCancelDelete = () => {
    setDataToDelete(null);
    closeModal();
  };

  const handleDelete = (id) => {
    console.log("delete", id);
    let endpoint = `${url}/${id}`;

    api.del(endpoint).then((res) => {
      if (!res.err) {
        let newData = students.filter((el) => el.id !== id);
        setStudents(newData);
        setDataToDelete(null);
        dispatch({
          type: "SUCCESS",
          message: "Alumno eliminado!",
        });
        closeModal();
      } else {
        setError(res);
        dispatch({
          type: "ERROR",
          message: "Error eliminando el alumno",
        });
      }
    });
  };

  return (
    <Layout>
      <h1 className="title">Alumnos</h1>

      <button
        onClick={handleClick}
        className="btn btn__primary"
        id="newStudent"
        type="button"
      >
        Nuevo alumno
      </button>
      {loading && <Loader />}
      {students && (
        <StudentsTable
          data={students}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        ></StudentsTable>
      )}

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <StudentDeleteForm
          dataToDelete={dataToDelete}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal>
    </Layout>
  );
};
export default Students;
