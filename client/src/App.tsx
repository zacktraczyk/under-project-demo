import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Form from "./components/form/Form";
import Graphs from "./components/graphs/Graphs";

import "./styles/App.scss";
import Login from "./components/login/Login";

const App = () => {
  const [formData, setFormData] = useState({});
  const logData = (data: Object) => {
    console.log("App.tsx: form data submitted:", data);
    setFormData(data);
  };
  return (
    <div className="app">
      <Login onSubmission={() => console.log("USER LOGGED IN")}/>
      {/* <Sidebar /> */}
      <div className="main-container">
        <Form submitData={(data: Object) => logData(data)} />
        <Graphs displayData={formData}/>
      </div>
    </div>
  );
};

export default App;
