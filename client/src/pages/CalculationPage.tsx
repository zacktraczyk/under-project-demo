import { useState } from "react";
import Form from "../components/form/Form";
import Graphs from "../components/graphs/Graphs";
import { Account } from "../components/login/Account";

import "../styles/App.scss";

export default function CalculationPage() {
  const [formData, setFormData] = useState({});
  const logData = (data: Object) => {
    console.log("App.tsx: form data submitted:", data);
    setFormData(data);
  };

  return (
    <Account>
      <div className="main-container" style={{backgroundImage: `url("https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=iQEwihUn");`}}>
        <Form submitData={(data: Object) => logData(data)} />
        <Graphs displayData={formData} />
      </div>
    </Account>
  );
}
