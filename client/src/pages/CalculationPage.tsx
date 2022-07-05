import React, { useState, useContext, useEffect } from "react";
import { Account, AccountContext } from "../components/login/Account";
import Form from "../components/form/Form";
import Graphs from "../components/graphs/Graphs";
import "../styles/App.scss";
import { Navigate } from "react-router-dom";

interface CalculationProps {
  loginInfo: {
    loggedIn: boolean | null;
    email: string;
    uId: string;
  };
}

export default function CalculationPage(props: CalculationProps) {
  const [formData, setFormData] = useState({});
  const logData = (data: Object) => {
    setFormData(data);
  };

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession();
    console.log(props.loginInfo);
  }, []);

  console.log(props.loginInfo);

  if (props.loginInfo.loggedIn === false) {
    return <Navigate replace={true} to="/login" />;
  }

  return (
    <div className="main-container">
      <Form submitData={(data: Object) => logData(data)} />
      <Graphs displayData={formData} loginInfo={props.loginInfo} />
      <button
        onClick={() => {
          logout();
          getSession();
        }}
      >
        Log out
      </button>
    </div>
  );
}
