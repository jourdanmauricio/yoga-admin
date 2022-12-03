import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout/layout";
import Message from "../../commons/Message/Message";
import { helHttp } from "../../helpers/helpHttp";
import Loader from "@/commons/Loader-overlay/Loader-overlay";
import "./settings.css";
import Tabs from "./Tabs/Tabs";
import { useNotification } from "../../commons/Notifications/NotificationProvider";

const Settings = () => {
  const dispatch = useNotification();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState([]);
  const [error, setError] = useState(null);

  const api = helHttp();
  const url = `${import.meta.env.VITE_BACKEND_API}/settings`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
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
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="title">Configuración</h1>

      {/* MESSAGE */}
      {error && <Message msg={error} closeMessage={() => setError(null)} />}
      {loading && <Loader />}
      <Tabs settings={settings} setError={setError} dispatch={dispatch}></Tabs>
    </Layout>
  );
};

export default Settings;
