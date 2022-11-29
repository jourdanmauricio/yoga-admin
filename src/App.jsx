import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { persistor, store } from "./store";

import "./App.css";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import { PersistGate } from "redux-persist/integration/react";
import Settings from "./pages/Settings/settings";
import Lessons from "./pages/Lessons/lessons";
import Students from "./pages/Students/students";
import NewStudent from "./pages/Students/components/NewStudent/NewStudent";
import EditStudent from "./pages/Students/components/EditStudent/EditStudent";

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

const AuthRoute = (props) => {
  let user = useSelector((state) => state.user.user);
  const auth = ["admin", "superadmin"];
  if (!auth.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return props.children;
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthRoute>
                  <Settings />
                </AuthRoute>
              }
            />
            <Route
              path="/lessons"
              element={
                <AuthRoute>
                  <Lessons />
                </AuthRoute>
              }
            />
            {/*  Students  */}
            <Route path="/students">
              <Route
                index
                element={
                  <AuthRoute>
                    <Students />
                  </AuthRoute>
                }
              />
              <Route
                path="new"
                element={
                  <AuthRoute>
                    <NewStudent />
                  </AuthRoute>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <AuthRoute>
                    <EditStudent />
                  </AuthRoute>
                }
              />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
