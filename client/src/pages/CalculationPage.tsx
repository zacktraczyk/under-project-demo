import { useState } from "react";
import Form from "../components/form/Form";
import Graphs from "../components/graphs/Graphs";
import { Account } from "../components/login/Account";

import "../styles/App.scss";

export default function CalculationPage() {
  const [formData, setFormData] = useState({});
  const logData = (data: Object) => {
    setFormData(data);
  };

  return (
    <Account>
      <div className="main-container">
        <Form submitData={(data: Object) => logData(data)} />
        <Graphs displayData={formData} />
      </div>
    </Account>
  );
}
