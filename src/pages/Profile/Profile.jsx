import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../commons/Layout/layout";
import Message from "../../commons/Message/Message";
import { Modal } from "../../commons/Modal/Modal";
import { useNotification } from "../../commons/Notifications/NotificationProvider";
import { helHttp } from "../../helpers/helpHttp";
import { useModal } from "../../hooks/useModal";

import "./profile.css";
import UserDeleteForm from "./components/UserDeleteForm/UserDeleteForm";
import UsersForm from "./components/UsersForm/UsersForm";
import UsersTable from "./components/UsersTable/UsersTable";

const initialState = {
  id: "",
  name: "",
  email: "",
  role: "",
  password: "",
  newPassword: "",
};

const Profile = () => {
  let user = useSelector((state) => state.user.user);
  const dispatch = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(initialState);
  const [dataToDelete, setDataToDelete] = useState(null);

  let api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/users`;

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setUsers(res);
        setError(null);
      } else {
        setError(res);
        setUsers(null);
      }
      setLoading(false);
    });
  }, []);

  console.log("User", user);
  console.log("Users", users);

  const createData = (data) => {
    delete data.id;
    delete data.confirmPassword;

    api.post(url, { body: data }).then((res) => {
      if (!res.err) {
        setUsers([...users, res]);
        dispatch({
          type: "SUCCESS",
          message: "Clase creada!",
        });
        console.log("Clase creada");
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
      password: data.password,
    };

    api.put(endpoint, { body: obj }).then((res) => {
      if (!res.err) {
        dispatch({
          type: "SUCCESS",
          message: "Usuario modificado!",
        });
        let newData = users.map((el) => (el.id === data.id ? data : el));
        setUsers(newData);
      } else {
        dispatch({
          type: "ERROR",
          message: "Error mnodificando el usuario",
        });
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
        let newData = users.filter((el) => el.id !== id);
        setUsers(newData);
        closeModal();
        setDataToDelete(null);
        dispatch({
          type: "SUCCESS",
          message: "Usuario eliminado!",
        });
      } else {
        setError(res);
        dispatch({
          type: "ERROR",
          message: "Error eliminando el usuario",
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
      <h1 className="title">Perfil</h1>
      <div className="form__container">
        <div className="user__detail">
          <p>Email:</p> <span>{user.email}</span>
          <p>Role:</p> <span>{user.role}</span>
        </div>
      </div>
      <br />
      <section className="lessons__container">
        <UsersForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {/* {loading && <Loader />} */}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#fa4e4e"
          />
        )}
        {users && (
          <UsersTable
            data={users}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </section>

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <UserDeleteForm
          dataToDelete={dataToDelete}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </Modal>
    </Layout>
  );
};

export default Profile;
