import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { userContext } from "./context/UserContext";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import "antd/dist/antd.css";

function App() {
  const { user } = useContext(userContext);

  return user ? (
    <div
      style={{
        maxWidth: "1140px",
        width: "100%",
        padding: "0 20px",
        margin: "0 auto",
      }}
    >
      <Main />
    </div>
  ) : (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
