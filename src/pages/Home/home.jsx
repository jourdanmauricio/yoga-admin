import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../commons/Layout/layout";
import { logOut } from "../../store/user";

import "./home.css";

const Home = () => {
  let user = useSelector((state) => state.user.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      {user && <button onClick={handleLogout}>Logout</button>}
      <Layout>
        <h1 className="title">HOME</h1>
      </Layout>
    </>
  );
};

export default Home;
