import React from "react";
import { Account } from "../components/login/Account";
import Login from "../components/login/Login";

function LoginPage() {
  return (
    <Account>
      <div className="app">
        <Login onSubmission={() => console.log("USER LOGGED IN")} />
      </div>
    </Account>
  );
}

export default LoginPage;
