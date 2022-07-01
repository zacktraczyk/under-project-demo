import React from "react";

import "../../styles/components/Graphs.scss";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface propsBarGraph {
  data: Array<Object>
}

const BarGraph = (props: propsBarGraph) => {
  console.log('BarGraph.tsx: BarGraph data:', props.data);
  return (
    <BarChart
      width={500}
      height={300}
      data={props.data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="initial" stackId="a" fill="#4A6E2C" />
      <Bar dataKey="contributions" stackId="a" fill="#6E9532" />
      <Bar dataKey="totalGrowth" stackId="a" fill="#CBD595" />
    </BarChart>
  );
};

export default BarGraph;
