import React, { useEffect, useState } from "react";
import generateStatisitcs, { DisplayData } from "../../generateStatistics";
import BarGraph from "./BarGraph";
import Pi from "./Pi";

import "../../styles/components/Graphs.scss";
import "../../components/form/Form.tsx";

interface GraphsProps {
  displayData: any | DisplayData;
}

function Graphs(props: GraphsProps) {
  const [statistics, setStatistics] = useState({
    barGraph: new Array(),
    pi: new Array(),
    yearTotal: NaN,
  });

  useEffect(() => {
    const { barStats, piStats, yearTotal } = generateStatisitcs(
      props.displayData
    );

    setStatistics({ barGraph: barStats, pi: piStats, yearTotal: yearTotal });
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
        <h2>$ {statistics.yearTotal}</h2>
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
