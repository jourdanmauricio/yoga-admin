import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout/layout";
import Message from "../../commons/Message/Message";
import { helHttp } from "../../helpers/helpHttp";
import SettingPage from "./SettingPage/SettingPage";
import "./settings.css";

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [error, setError] = useState(null);

  const api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/settings`;

  useEffect(() => {
    async function fetchData() {
      // setLoading(true);
      try {
        const data = await api.get(url);

        if (data.statusCode) {
          throw data;
        } else {
          const obj = {};
          data.forEach((el) => {
            obj[el.feature] = el.value;
          });
          setSettings(obj);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <h1>Configuración</h1>

      {/* MESSAGE */}
      {error && <Message msg={error} closeMessage={() => setError(null)} />}

      <SettingPage settings={settings} setError={setError}></SettingPage>
    </Layout>
  );
};

export default Settings;
