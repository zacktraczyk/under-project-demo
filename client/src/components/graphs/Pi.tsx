import React from "react";
import { PieChart, Pie, Cell } from "recharts";

import "../../styles/components/Pi.scss";

interface propsPiGraph {
  data: Array<Object>
}

const COLORS = ["#4A6E2C", "#6E9532", "#CBD595"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Pi = (props: propsPiGraph) => {
  console.log('PiGraph.tsx: PiGraph data:', props.data);
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={props.data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default Pi;
