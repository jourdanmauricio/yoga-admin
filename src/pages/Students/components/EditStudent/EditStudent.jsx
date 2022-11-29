import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../../commons/Layout/layout";
import { helHttp } from "../../../../helpers/helpHttp";
import StudentForm from "../StudentForm/StudentForm";

const EditStudent = () => {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/customers/${id}`;

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setStudent(res);
        setError(null);
      } else {
        setError(res);
        setStudent(null);
      }
      setLoading(false);
    });
  }, [id]);

  return (
    <Layout>
      <StudentForm dataToEdit={student} />
    </Layout>
  );
};

export default EditStudent;
