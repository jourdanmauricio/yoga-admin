import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout/layout";
import { helHttp } from "../../helpers/helpHttp";
import LessonsForm from "./components/LessonsForm/LessonsForm";
import LessonsTable from "./components/LessonsTable/LessonsTable";
import "./lessons.css";

const Lessons = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  let api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/lessons`;

  useEffect(() => {
    api.get(url).then((res) => {
      console.log(res.err);
      if (!res.err) {
        setDb(res);
      } else {
        setDb(null);
      }
    });
  }, []);

  const createData = (data) => {
    data.id = Date.now();
    setDb([...db, data]);
  };

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(`¿Estás seguro de eliminar el id ${id}?`);
    if (isDelete) {
      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  };

  return (
    <Layout>
      <h1>Clases</h1>
      <section className="lessons__container">
        <LessonsForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <LessonsTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </section>
    </Layout>
  );
};

export default Lessons;
