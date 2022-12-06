import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout/layout";
import Tabs from "./components/Tabs/Tabs";
import { helpHttp } from "@/helpers/helpHttp";
import "./home.css";

const Home = () => {
  const [noCertificate, setNoCertificate] = useState([]);
  const [birthdayMonth, setBirthdayMonth] = useState([]);

  const api = helpHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/customers`;

  useEffect(() => {
    async function fetchData() {
      // setLoading(true);
      try {
        const data = await api.get(url);
        if (data.statusCode) {
          throw data;
        }

        const noCertif = data.filter(
          (el) => el.status === "Activo" && el.certificate === false
        );
        setNoCertificate(noCertif);

        const dataMonthBirthday = data.filter(
          (el) =>
            el.status === "Activo" &&
            new Date().getUTCMonth() + 1 ===
              new Date(el.birthday).getUTCMonth() + 1
        );
        setBirthdayMonth(dataMonthBirthday);
      } catch (err) {
        setError(`${err.statusCode}: ${err.error} - ${err.message}`);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Layout>
        <h1 className="title">Dashborad</h1>
        <Tabs noCertificate={noCertificate} birthdayMonth={birthdayMonth} />
      </Layout>
    </>
  );
};

export default Home;
