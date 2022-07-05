import React, { useContext, useEffect } from "react";
import { AccountContext } from "../components/login/Account";
import Login from "../components/login/Login";
import { Navigate } from "react-router-dom";

interface LoginPageProps {
  loginInfo: {
    loggedIn: boolean | null;
    email: string;
    uId: string;
  };
}

function LoginPage(props: LoginPageProps) {
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession();
  }, []);

  if (props.loginInfo.loggedIn === true) {
    return <Navigate replace={true} to="/calculate" />;
  }

  return (
    <div className="app">
      <Login onSubmission={() => console.log("USER LOGGED IN")} />
    </div>
  );
}

export default LoginPage;
