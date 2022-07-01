import React, { useEffect, useState } from "react";
import generateStatisitcs, { DisplayData } from "../../generateStatistics";
import BarGraph from "./BarGraph";
import Pi from "./Pi";

import "../../styles/components/Graphs.scss";
import "../../components/form/Form.tsx";

interface GraphsProps {
  displayData: any|DisplayData;
}

function Graphs(props: GraphsProps) {
  const [statistics, setStatistics] = useState({ barGraph: new Array(), pi: {} });

  useEffect(() => {
    console.log("Graph.tsx: useEffect: DATA UPDATED");

    const { barStats, piStats } = generateStatisitcs(props.displayData);

    setStatistics({ barGraph: barStats, pi: piStats });
  }, [props.displayData]);

  return (
    <div className="graph-container">
      <BarGraph data={statistics.barGraph} />
      <Pi />
    </div>
  );
}

export default Graphs;
