import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Statistics = () => {
  return (
    <div className="content_container">
      <h1>Statistic</h1>
      <div className="two_side_grid">
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Statistics;
