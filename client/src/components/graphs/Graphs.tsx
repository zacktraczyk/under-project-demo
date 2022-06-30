import React, { useEffect, useState } from "react";
import BarGraph from "./BarGraph";
import Pi from "./Pi";

import "../../styles/components/Graphs.scss";
import "../../components/form/Form.tsx";
interface GraphsProps {
  displayData: {},
}

function Graphs(props: GraphsProps) {

  const [statistics, setStatistics] = useState({graph: {}, pi: {}});

  useEffect(() => {
    console.log('Graph.tsx: useEfefct: DATA UPDATED')
    //Trying to grab data
    //let x = FormData.initInvest.value;
    //let y = data.initInvest.value;
    
    /*
     NOTE: Calculate Statistics from form data function 
     call goes here. Function take object literal with 
     string values and returns object literal with numbers
     ready for graph display
    
     const calcStats = generateStatistics(props.displayData);
     */

    const calcStats = {
      startAmnt: 5,

      2022: {
        contr: 2,
        totalGrow: 0.5
      },
      2023: {
        contr: 2,
        totalGrow: 0.5
      },
      2024: {
        contr: 2,
        totalGrow: 0.5
      }
    }

    setStatistics({graph: calcStats, pi: {}});

  }, [props.displayData])

  return (
    <div className="graph-container">
      <BarGraph displayData={statistics.graph}/>
      <Pi />
    </div>
  );
}

export default Graphs;
