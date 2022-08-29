import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CalculationPage from "./pages/CalculationPage";
import { Account } from "./components/login/Account";

import "./styles/index.scss";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  const [loginInfo, setLoginInfo] = useState({
    loggedIn: null,
    email: "",
    uId: "",
  });

  return (
    <Account setLoginInfo={setLoginInfo}>
      <Navbar />

      <BrowserRouter basename="/under-project-demo">
        <Routes>
          <Route path="/" element={<Navigate to="/calculate" />} />
          <Route path="login" element={<LoginPage loginInfo={loginInfo} />} />
          <Route
            path={"calculate"}
            element={<CalculationPage loginInfo={loginInfo} />}
          />
        </Routes>
      </BrowserRouter>
    </Account>
  );
};

export default App;
