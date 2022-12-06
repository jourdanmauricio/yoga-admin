import React, { useState } from "react";
import { useEffect } from "react";
import { useNotification } from "@/commons/Notifications/NotificationProvider";
import { helpHttp } from "@/helpers/helpHttp";
import Message from "@/commons/Message/Message";
import Loader from "@/commons/Loader-overlay/Loader-overlay";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/commons/Modal/Modal";
import NewsletterDeleteForm from "./NewsletterDeleteForm";
import NewsletterTable from "./NewsletterTable";

const Newsletter = () => {
  const dispatch = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataToDelete, setDataToDelete] = useState(null);

  const api = helpHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/subscribers`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await api.get(url);

        if (data.statusCode) {
          throw data;
        }
        setData(data);
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
      const resData = await api.del(endpoint);

      if (resData.statusCode) throw data;
      let newData = data.filter((el) => el.id !== id);
      setData(newData);
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
      <h2 className="title">Suscriptores</h2>
      {error && <Message msg={error} closeMessage={() => setError(null)} />}
      {loading && <Loader />}
      <br />
      <NewsletterTable deleteData={deleteData} data={data} />

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <NewsletterDeleteForm
          dataToDelete={dataToDelete}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal>
    </>
  );
};

export default Newsletter;
