import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout/layout";
import Message from "../../commons/Message/Message";
import Loader from "../../components/Loader/Loader";
import { helHttp } from "../../helpers/helpHttp";
import LessonsDeleteForm from "./components/LessonsDeleteForm/LessonsDeleteForm";
import LessonsForm from "./components/LessonsForm/LessonsForm";
import LessonsTable from "./components/LessonsTable/LessonsTable";

import { Modal } from "../../commons/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import "./lessons.css";
import { useNotification } from "../../commons/Notifications/NotificationProvider";

const Lessons = () => {
  const dispatch = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [db, setDb] = useState(null);
  const [loading, setLoaging] = useState(false);
  const [error, setError] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);

  let api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/lessons`;

  useEffect(() => {
    setLoaging(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setError(res);
        setDb(null);
      }
      setLoaging(false);
    });
  }, [url]);

  const createData = (data) => {
    delete data.id;
    data.studentQuantity = 12;
    api.post(url, { body: data }).then((res) => {
      if (!res.err) {
        setDb([...db, res]);
        dispatch({
          type: "SUCCESS",
          message: "Clase creada!",
        });
      } else {
        dispatch({
          type: "ERROR",
          message: "Error creando la clase",
        });
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    let obj = {
      days: data.days,
      hours: data.hours,
    };

    api.put(endpoint, { body: obj }).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (data) => {
    setDataToDelete(data);
    openModal();
  };

  const handleDelete = (id) => {
    let endpoint = `${url}/${id}`;

    api.del(endpoint).then((res) => {
      if (!res.err) {
        let newData = db.filter((el) => el.id !== id);
        setDb(newData);
        setDataToDelete(null);
        dispatch({
          type: "SUCCESS",
          message: "Clase eliminada!",
        });
        closeModal();
      } else {
        setError(res);
        dispatch({
          type: "ERROR",
          message: "Error eliminando la clase",
        });
      }
    });
  };

  const handleCancelDelete = () => {
    setDataToDelete(null);
    closeModal();
  };

  return (
    <Layout>
      <h1 className="lessons__title">Clases</h1>
      <section className="lessons__container">
        <LessonsForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#fa4e4e"
          />
        )}
        {db && (
          <LessonsTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </section>

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <LessonsDeleteForm
          dataToDelete={dataToDelete}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal>
    </Layout>
  );
};

export default Lessons;
