import React from "react";

import "../../styles/components/Sidebar.scss";

const Sidebar = () => {
  return (
  <div className="sidebar-container">
    <h2>What do you want to calculate?</h2>
    <ul>
      <li>
        <h3>End Amount</h3>
      </li>
      <li>
        <h3>Years to Accumulate</h3>
      </li>
      <li>
        <h3>Initial Investment</h3>
      </li>
      <li>
        <h3>Return Rate</h3>
      </li>
      <li>
        <h3>Additional Contribution</h3>
      </li>
    </ul>
    </div>
  );
};

export default Sidebar;
