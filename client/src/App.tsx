import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Form from "./components/form/Form";
import Graph from "./components/graphs/Graph";

import "./styles/App.scss";

const App = () => {
  const logData = (data: Object) => {
    console.log("App.tsx: form data submitted:", data);
  };
  return (
    <div className="app">
      <Sidebar />
      <div className="main-container">
        <Form submitData={(data: Object) => logData(data)} />
        <Graph />
      </div>
    </div>
  );
};

export default App;
