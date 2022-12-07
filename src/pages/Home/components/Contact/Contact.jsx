import React, { useState } from "react";
import { useEffect } from "react";
import { useNotification } from "@/commons/Notifications/NotificationProvider";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/commons/Modal/Modal";
import { helpHttp } from "@/helpers/helpHttp";
import Message from "@/commons/Message/Message";
import Loader from "@/commons/Loader-overlay/Loader-overlay";
import ContactDeleteForm from "./components/ContactDeleteForm";
import ContactTable from "./components/ContactTable";

const Contact = () => {
  const dispatch = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState([]);
  const [dataToDelete, setDataToDelete] = useState(null);

  const api = helpHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/comments`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await api.get(url);

        if (data.statusCode) {
          throw data;
        }
        setContact(data);
      } catch (err) {
        setError(`${err.statusCode}: ${err.error} - ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const deleteData = (data) => {
    setDataToDelete(data);
    openModal();
  };

  const handleDelete = async (id) => {
    let endpoint = `${url}/${id}`;
    setLoading(true);
    try {
      const data = await api.del(endpoint);

      if (data.statusCode) throw data;
      let newData = contact.filter((el) => el.id !== id);
      setContact(newData);
      closeModal();
      setDataToDelete(null);
      dispatch({
        type: "SUCCESS",
        message: "Mensaje eliminado!",
      });
    } catch (err) {
      setError(`${err.statusCode}: ${err.error} - ${err.message}`);
      dispatch({
        type: "ERROR",
        message: "Error eliminando el mensaje",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDataToDelete(null);
    closeModal();
  };
  return (
    <>
      <h2 className="title">Contactos</h2>
      {error && <Message msg={error} closeMessage={() => setError(null)} />}
      {loading && <Loader />}
      <br />
      <ContactTable deleteData={deleteData} contact={contact} />

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <ContactDeleteForm
          dataToDelete={dataToDelete}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal>
    </>
  );
};

export default Contact;
