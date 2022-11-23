import { Provider } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { persistor, store } from "./store";

import "./App.css";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import { PersistGate } from "redux-persist/integration/react";

let Error404 = () => {
  return (
    <>
      <Link to="/videos">Ir a inicio</Link>
      <h1>Esta página no existe. 404</h1>
    </>
  );
};

let NotImplemented = () => {
  return (
    <>
      <Link to="/videos">Ir a videos</Link>

      <h1>Esta página aún no se encuentra disponible</h1>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
