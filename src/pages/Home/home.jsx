import React from "react";
import Layout from "../../commons/Layout/layout";
import Tabs from "./components/Tabs/Tabs";

import "./home.css";

const Home = () => {
  return (
    <>
      <Layout>
        <h1 className="title">HOME</h1>
        <h2>Alumnos x clase</h2>
        <h2>Sin certificado</h2>
        <h2>Cumpleaños del mes</h2>
        <Tabs />
      </Layout>
    </>
  );
};

export default Home;
