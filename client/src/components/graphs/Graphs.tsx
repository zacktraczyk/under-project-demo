import React, { useEffect, useState } from "react";
import generateStatisitcs, { DisplayData } from "../../generateStatistics";
import BarGraph from "./BarGraph";
import Pi from "./Pi";
import axios from "axios";
import "../../styles/components/Graphs.scss";
import "../../components/form/Form.tsx";

interface GraphsProps {
  displayData: any | DisplayData;
  loginInfo: {
    loggedIn: boolean | null;
    email: string;
    uId: string;
  };
}

function Graphs(props: GraphsProps) {
  const [statistics, setStatistics] = useState({
    barGraph: new Array(),
    pi: new Array(),
    yearTotal: NaN,
  });

  const [submissionNumber, setSubmissionNumber] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://1jsob4hkr0.execute-api.us-east-2.amazonaws.com/prod/main/" +
          props.loginInfo.uId
      )
      .then((response) => {
        setSubmissionNumber(response.data.length);
      });
  }, []);

  useEffect(() => {
    const { barStats, piStats, yearTotal } = generateStatisitcs(
      props.displayData
    );

    setStatistics({ barGraph: barStats, pi: piStats, yearTotal: yearTotal });

    if (barStats.length > 0) {
      console.log("AXIOS PUT DISCONNECTED TO NOt add too much clutter");

      // axios
      //   .put(
      //     "https://1jsob4hkr0.execute-api.us-east-2.amazonaws.com/prod/main",
      //     {
      //       clientId: props.loginInfo.uId,
      //       formId: "ROI-Form#" + submissionNumber,
      //       submissionNumber: submissionNumber,
      //       input: JSON.stringify(props.displayData),
      //       barStats: JSON.stringify(barStats),
      //       piStats: JSON.stringify(piStats),
      //       yearTotal: JSON.stringify(yearTotal),
      //     }
      //   )
      //   .then((response) => {
      //     console.log(response);
      //   });
      setSubmissionNumber(submissionNumber + 1);
    }
  }, [props.displayData]);

  if (isNaN(statistics.yearTotal)) {
    return (
      <div className="result-conatiner">
        <div className="graph-container"></div>
      </div>
    );
  } else {
    return (
      <div className="result-conatiner">
        <h1>Total Balance in 2026:</h1>
        <h2>$ {~~statistics.yearTotal}</h2>
        <div className="graph-container">
          <div className="bar-graph-container">
            <h1 className="graph-label">Investment Growth Over Time</h1>
            <BarGraph data={statistics.barGraph} />
          </div>
          <div pi-container>
            <h1 className="graph-label">Investment Breakdown</h1>
            <Pi data={statistics.pi} />
          </div>
        </div>
      </div>
    );
  }
}
export default Graphs;
