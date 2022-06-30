import React, { useState } from "react";
import Form from "../components/form/Form";
import Graphs from "../components/graphs/Graphs";

import "../styles/App.scss";

export default function CalculationPage() {

  const [formData, setFormData] = useState({});
  const logData = (data: Object) => {
    console.log("App.tsx: form data submitted:", data);
    setFormData(data);
  };

  return (
    <div className="main-container">
      <Form submitData={(data: Object) => logData(data)} />
      <Graphs displayData={formData} />
    </div>
  );
}
