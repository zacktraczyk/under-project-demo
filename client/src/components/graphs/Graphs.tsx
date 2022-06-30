import React from "react";
import BarGraph from "./BarGraph";
import Pi from "./Pi";
import { ROIData } from "../form/Form";

import "../../styles/components/Graphs.scss";

interface GraphsProps {
  displayData: ROIData|{},
}

function Graphs(props: GraphsProps) {
  return (
    <div className="graph-container">
      <BarGraph />
      <Pi />
    </div>
  );
}

export default Graphs;
